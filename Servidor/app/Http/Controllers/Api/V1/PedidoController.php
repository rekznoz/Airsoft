<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\PedidoRequest;
use App\Http\Resources\V1\PedidoResource;
use App\Models\Pedido;
use Laravel\Telescope\Telescope;

class PedidoController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:index']);
        }

        $query = Pedido::query();

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

        $pedido->update($request->validated());

        return new PedidoResource($pedido);
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
