<?php

namespace App\Http\Controllers;

use App\Http\Resources\ComentarioResource;
use App\Models\Comentario;
use App\Http\Requests\ComentarioRequest;
use Laravel\Telescope\Telescope;

class ComentarioController extends Controller
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

        $query = Comentario::filter(request()->only('search', 'calificacion', 'user_id'));

        return ComentarioResource::collection($query->latest()->paginate(100));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComentarioRequest $request)
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

        $comentario = Comentario::create($request->validated());

        return new ComentarioResource($comentario);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:show']);
        }

        return new ComentarioResource($comentario);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ComentarioRequest $request, Comentario $comentario)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:update']);
        }

        if (!auth()->user()->can('editar comentario')) {
            return response()->json(['error' =>
                'No tienes permisos para editar comentarios'], 403);
        }

        $comentario->update($request->validated());

        return new ComentarioResource($comentario);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:destroy']);
        }

        if (!auth()->user()->can('eliminar comentario')) {
            return response()->json(['error' =>
                'No tienes permisos para eliminar comentarios'], 403);
        }

        $comentario->delete();

        return response()->json(['message' => 'Comentario eliminado correctamente']);
    }
}
