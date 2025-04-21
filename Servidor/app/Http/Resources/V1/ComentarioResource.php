<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComentarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request); devuelve todos los campos de la tabla,tal cual
        return [
            'id' => $this->id,
            'comentario' => $this->comentario,
            'tarea' => $this->tarea,
            'user' => $this->user,
        ];
    }
}
