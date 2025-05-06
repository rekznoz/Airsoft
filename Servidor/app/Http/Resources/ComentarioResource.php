<?php

namespace App\Http\Resources;

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
        return [
            "id" => $this->id,
            'user' => $this->user,
            'producto' => $this->producto,
            "comentario" => $this->comentario,
            "calificacion" => $this->calificacion,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
