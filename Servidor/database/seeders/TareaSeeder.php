<?php

namespace Database\Seeders;

use App\Models\Tarea;
use Illuminate\Database\Seeder;
use App\Models\User;

class TareaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(10)
            ->has(
                Tarea::factory()
                    ->count(20)
                    ->hasComentarios(10) // Aquí los comentarios se crean desde la tarea
            )
            ->create();

    }
}
