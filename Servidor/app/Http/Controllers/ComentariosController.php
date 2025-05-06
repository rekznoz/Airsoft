<?php

namespace App\Http\Controllers;

use App\Http\Resources\ComentariosResource;
use App\Models\Comentarios;
use App\Http\Requests\ComentariosRequest;
use Laravel\Telescope\Telescope;

class ComentariosController extends Controller
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

        $query = Comentarios::query();

        return ComentariosResource::collection($query->latest()->paginate(100));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComentariosRequest $request)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () {
                return ['api_request', 'action:store'];
            });
        }

        if (!auth()->user()->can('agregar comentario')) {
            return response()->json(['error' =>
                'No tienes permisos para crear comentarios'], 403);
        }

        $comentario = Comentarios::create($request->validated());

        return new ComentariosResource($comentario);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentarios $comentarios)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:show']);
        }

        return new ComentariosResource($comentarios);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ComentariosRequest $request, Comentarios $comentarios)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:update']);
        }

        if (!auth()->user()->can('editar comentario')) {
            return response()->json(['error' =>
                'No tienes permisos para editar comentarios'], 403);
        }

        $comentarios->update($request->validated());

        return new ComentariosResource($comentarios);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentarios $comentarios)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:destroy']);
        }

        if (!auth()->user()->can('eliminar comentario')) {
            return response()->json(['error' =>
                'No tienes permisos para eliminar comentarios'], 403);
        }

        $comentarios->delete();

        return response()->json(['message' => 'Comentario eliminado correctamente']);
    }
}
