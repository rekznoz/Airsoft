<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion,
            'precio' => $this->precio,
            'descuento' => $this->descuento,
            'precio_final' => $this->precio_final,
            'stock' => $this->stock,
            'categoria' => [
                'id' => $this->categoria?->id,
                'nombre' => $this->categoria?->nombre,
            ],
            'marca' => $this->marca,
            'modelo' => $this->modelo,
            'fps' => $this->fps,
            'calibre' => $this->calibre,
            'capacidad_cargador' => $this->capacidad_cargador,
            'peso' => $this->peso,
            'imagenes' => $this->imagenes,
            'video_demo' => $this->video_demo,
            'tiempo_envio' => $this->tiempo_envio,
            'estado_activo' => $this->estado_activo,
            'array_comentarios' => $this->comentarios?->map(function ($comentario) {
                return [
                    'id' => $comentario->id,
                    'user' => [
                        'id' => $comentario->user?->id,
                        'nombre' => $comentario->user?->nombre,
                    ],
                    'comentario' => $comentario->comentario,
                    'calificacion' => $comentario->calificacion,
                    'created_at' => $comentario->created_at?->toDateTimeString(),
                ];
            }),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
