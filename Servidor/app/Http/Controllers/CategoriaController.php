<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriaRequest;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;
use App\Http\Resources\CategoriaResource;
use App\Models\Categoria;
use Laravel\Telescope\Telescope;

class CategoriaController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:index']);
        }

        $query = Categoria::query();

        return CategoriaResource::collection($query->latest()->paginate(100));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoriaRequest $request)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () {
                return ['api_request', 'action:store'];
            });
        }

        if (!auth()->user()->can('agregar categoria')) {
            return response()->json(['error' =>
                'No tienes permisos para crear categorias'], 403);
        }

        $categoria = Categoria::create($request->validated());

        return new CategoriaResource($categoria);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:show']);
        }

        return new CategoriaResource($categoria);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(CategoriaRequest $request, Categoria $categoria)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:update']);
        }

        if (!auth()->user()->can('editar categoria')) {
            return response()->json(['error' =>
                'No tienes permisos para editar categorias'], 403);
        }

        $categoria->update($request->validated());

        return new CategoriaResource($categoria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:destroy']);
        }

        if (!auth()->user()->can('eliminar categoria')) {
            return response()->json(['error' =>
                'No tienes permisos para eliminar categorias'], 403);
        }

        $categoria->delete();

        return response()->json(['message' => 'Categoria eliminada correctamente']);
    }
}
