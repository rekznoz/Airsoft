<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductoRequest;
use App\Http\Resources\ProductoResource;
use App\Models\Producto;
use Laravel\Telescope\Telescope;

class ProductoController extends Controller
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

        $query = Producto::query();

        return ProductoResource::collection($query->latest()->paginate(100));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductoRequest $request)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () {
                return ['api_request', 'action:store'];
            });
        }

        if (!auth()->user()->can('agregar producto')) {
            return response()->json(['error' =>
                'No tienes permisos para crear productos'], 403);
        }

        $producto = Producto::create($request->validated());

        return new ProductoResource($producto);
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:show']);
        }

        return new ProductoResource($producto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductoRequest $request, Producto $producto)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:update']);
        }

        if (!auth()->user()->can('editar producto')) {
            return response()->json(['error' =>
                'No tienes permisos para actualizar productos'], 403);
        }

        $producto->update($request->validated());

        return new ProductoResource($producto);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:destroy']);
        }

        if (!auth()->user()->can('eliminar producto')) {
            return response()->json(['error' =>
                'No tienes permisos para eliminar productos'], 403);
        }

        $producto->delete();

        return response()->json(['message' => 'Producto eliminado correctamente.']);
    }
}
