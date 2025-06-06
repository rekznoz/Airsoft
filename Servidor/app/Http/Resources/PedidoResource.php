<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidoResource extends JsonResource
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
            'user' => [
                'id' => $this->user->id,
                'nombre' => $this->user->name,
            ],
            'producto' => [
                'id' => $this->producto->id,
                'nombre' => $this->producto->nombre,
            ],
            'direccion_envio' => $this->direccion_envio,
            'cantidad' => $this->cantidad,
            'estado' => $this->estado,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
