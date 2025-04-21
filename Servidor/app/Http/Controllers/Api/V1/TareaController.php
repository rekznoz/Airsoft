<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreTareaRequest;
use App\Http\Requests\V1\TareaRequest;
use App\Http\Requests\V1\UpdateTareaRequest;
use App\Http\Resources\V1\TareaResource;
use App\Models\Tarea;
use Illuminate\Support\Facades\Auth;
use Laravel\Telescope\Telescope;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TareaController extends Controller
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
     *     path="/api/v1/tareas",
     *     summary="Listado de tareas",
     *     tags={"Tareas"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="query",
     *         description="Filtrar por usuario",
     *         required=false,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Listado de tareas",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Tarea")
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

        $query = Tarea::query();

        // Filtrar por usuario si se proporciona `user_id`
        if (request()->has('user_id')) {
            $query->where('user_id', request()->input('user_id'));
        }

        return TareaResource::collection($query->latest()->paginate(100));
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
     *     path="/api/v1/tareas",
     *     summary="Crear una nueva tarea",
     *     tags={"Tareas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Tarea")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tarea creada correctamente",
     *         @OA\JsonContent(ref="#/components/schemas/Tarea")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tienes permisos para crear Tareas"
     *     )
     * )
     */
    public function store(TareaRequest $request)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () {
                return ['api_request', 'action:store'];
            });
        }

        if (!auth()->user()->can('create tarea')) {
            return response()->json(['error' =>
                'No tienes permisos para crear Tareas'], 403);
        }

        $tarea = Tarea::create($request->validated());

        return new TareaResource($tarea);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/v1/tareas/{tarea}",
     *     summary="Mostrar una tarea",
     *     tags={"Tareas"},
     *     @OA\Parameter(
     *         name="tarea",
     *         in="path",
     *         description="ID de la tarea",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tarea",
     *         @OA\JsonContent(ref="#/components/schemas/Tarea")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Tarea no encontrada"
     *     )
     * )
     */
    public function show(Tarea $tarea)
    {
        if (config('telescope.enabled')) {
            Telescope::tag(function () use ($tarea) {
                return [
                    'api_request',
                    'action:show',
                    'tarea_id:' . $tarea->id,
                ];
            });
        }

        if (!$tarea) {
            throw new NotFoundHttpException("Tarea no encontrada");
        }
        return response()->json(new TareaResource($tarea), 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tarea $tarea)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/v1/tareas/{tarea}",
     *     summary="Actualizar una tarea",
     *     tags={"Tareas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter( name="tarea", in="path", description="ID de la tarea", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody( required=true, @OA\JsonContent(ref="#/components/schemas/Tarea")),
     *     @OA\Response(response=200, description="Tarea actualizada correctamente", @OA\JsonContent(ref="#/components/schemas/Tarea")),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=403, description="No tienes permisos para editar Tareas"),
     *     @OA\Response(response=404, description="Tarea no encontrada")
     * )
     */
    public function update(TareaRequest $request, Tarea $tarea)
    {
        $this->authorize('edit tarea', $tarea);
        $tarea->update($request->only(['nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'estado']));
        return new TareaResource($tarea);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/v1/tareas/{tarea}",
     *     summary="Eliminar una tarea",
     *     tags={"Tareas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter( name="tarea", in="path", description="ID de la tarea", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Tarea eliminada correctamente"),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=403, description="No tienes permisos para eliminar Tareas"),
     *     @OA\Response(response=404, description="Tarea no encontrada")
     * )
     */
    public function destroy(Tarea $tarea)
    {
        $this->authorize('delete tarea', $tarea);
        $tarea->delete();
        return response()->json(['message' => 'Tarea eliminada correctamente'], 200);
    }


}
