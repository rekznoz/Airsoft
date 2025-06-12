<?php

namespace App\Http\Controllers;

use App\Http\Requests\PedidoRequest;
use App\Http\Resources\PedidoResource;
use App\Models\Pedido;
use Laravel\Telescope\Telescope;

class PedidoController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:index']);
        }

        $query = Pedido::filter(request()->only('search', 'estado', 'user_id'));

        return PedidoResource::collection($query->latest()->paginate(100));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PedidoRequest $request)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () {
                return ['api_request', 'action:store'];
            });
        }

        if (!auth()->user()->can('agregar pedido')) {
            return response()->json(['error' =>
                'No tienes permisos para crear pedidos'], 403);
        }

        $pedido = Pedido::create($request->validated());

        return new PedidoResource($pedido);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:show']);
        }

        return new PedidoResource($pedido);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(PedidoRequest $request, Pedido $pedido)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:update']);
        }

        if (!auth()->user()->can('editar pedido')) {
            return response()->json(['error' =>
                'No tienes permisos para editar pedidos'], 403);
        }

        $datos = $request->validated();

        $estadoAnterior = $pedido->estado;
        $estadoNuevo = $datos['estado'] ?? $pedido->estado;

        // Asegúrate de cargar el producto relacionado
        $pedido->load('producto');

        if ($estadoAnterior !== $estadoNuevo) {
            $producto = $pedido->producto;

            if (!$producto) {
                return response()->json(['error' => 'Producto no encontrado para el pedido'], 400);
            }

            // Si pasa de pendiente/procesando → enviado → RESTAR STOCK
            if (
                in_array($estadoAnterior, ['pendiente', 'procesando']) &&
                $estadoNuevo === 'enviado'
            ) {
                if ($producto->stock < $pedido->cantidad) {
                    return response()->json(['error' => 'Stock insuficiente'], 400);
                }

                $producto->stock -= $pedido->cantidad;
                $producto->save();
            }

            // Si pasa de enviado → pendiente/procesando → SUMAR STOCK
            if (
                $estadoAnterior === 'enviado' &&
                in_array($estadoNuevo, ['pendiente', 'procesando'])
            ) {
                $producto->stock += $pedido->cantidad;
                $producto->save();
            }
        }

        $pedido->update($datos);

        return new PedidoResource($pedido->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:destroy']);
        }

        if (!auth()->user()->can('eliminar pedido')) {
            return response()->json(['error' =>
                'No tienes permisos para eliminar pedidos'], 403);
        }

        $pedido->delete();

        return response()->json(['message' => 'Pedido eliminado correctamente']);
    }
}
