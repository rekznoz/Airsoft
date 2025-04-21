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
            'Airsoft',
            'Réplica de armas',
            'Munición',
            'Accesorios',
            'Ropa táctica',
        ];

        foreach ($categorias as $nombre) {
            Categoria::create([
                'nombre' => $nombre,
                'descripcion' => "Productos de categoría: $nombre",
                'slug' => Str::slug($nombre),
            ]);
        }
    }
}
