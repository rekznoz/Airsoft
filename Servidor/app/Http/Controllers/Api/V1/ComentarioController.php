<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ComentarioRequest;
use App\Http\Resources\V1\ComentarioResource;
use App\Models\Comentario;
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
    /**
     * @OA\Get(
     *     path="/api/v1/comentarios",
     *     summary="Listado de comentarios",
     *     tags={"Comentarios"},
     *     @OA\Parameter(
     *         name="tarea_id",
     *         in="query",
     *         description="Filtrar por tarea",
     *         required=false,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Listado de comentarios",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Comentario")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function index()
    {
        if (config('telescope.enabled')) {
            Telescope::tag(fn() => ['api_request', 'action:index']);
        }

        $query = Comentario::query();

        // Filtrar por tarea si se proporciona `tarea_id`
        if (request()->has('tarea_id')) {
            $query->where('tarea_id', request()->input('tarea_id'));
        }

        return ComentarioResource::collection($query->latest()->paginate(100));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *     path="/api/v1/comentarios",
     *     summary="Crear comentario",
     *     tags={"Comentarios"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Comentario")
     *     ),
     *     @OA\Response(response=200, description="Comentario creado"),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function store(ComentarioRequest $request)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () {
                return ['api_request', 'action:store'];
            });
        }

        if (!auth()->user()->can('create tarea')) {
            return response()->json(['error' =>
                'No tienes permisos para comentar tareas'], 403);
        }

        $comentario = Comentario::create($request->validated());

        return new ComentarioResource($comentario);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/v1/comentarios/{comentario}",
     *     summary="Mostrar comentario",
     *     tags={"Comentarios"},
     *     @OA\Parameter(
     *         name="comentario",
     *         in="path",
     *         description="ID del comentario",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Comentario",
     *         @OA\JsonContent(ref="#/components/schemas/Comentario")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function show(Comentario $comentario)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () use ($comentario) {
                return ['api_request', 'action:show', 'comentario_id:' . $comentario->id];
            });
        }

        return new ComentarioResource($comentario);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/v1/comentarios/{comentario}",
     *     summary="Actualizar comentario",
     *     tags={"Comentarios"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="comentario",
     *         in="path",
     *         description="ID del comentario",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Comentario")
     *     ),
     *     @OA\Response(response=200, description="Comentario actualizado"),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function update(ComentarioRequest $request, Comentario $comentario)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () use ($comentario) {
                return ['api_request', 'action:update', 'comentario_id:' . $comentario->id];
            });
        }

        if (!auth()->user()->can('edit comentario')) {
            return response()->json(['error' =>
                'No tienes permisos para actualizar comentarios'], 403);
        }

        $comentario->update($request->validated());

        return new ComentarioResource($comentario);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/v1/comentarios/{comentario}",
     *     summary="Eliminar comentario",
     *     tags={"Comentarios"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="comentario",
     *         in="path",
     *         description="ID del comentario",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(response=200, description="Comentario eliminado"),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function destroy(Comentario $comentario)
    {
        $this->authorize('delete comentario', $comentario);
        $comentario->delete();
        return response()->json(['message' => 'Comentario eliminado correctamente'], 200);
    }
}
