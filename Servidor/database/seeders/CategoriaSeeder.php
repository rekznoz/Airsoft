<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            'Replicas de Inicio',
            'Replicas de Aire Comprimido',
            'Replicas de Gas',
            'Replicas Electricas',
        ];

        foreach ($categorias as $nombre) {
            Categoria::create([
                'nombre' => $nombre,
                'descripcion' => "Productos de categoría: $nombre",
            ]);
        }
    }
}
