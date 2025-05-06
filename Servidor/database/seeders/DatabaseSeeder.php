<?php

namespace Database\Seeders;

use App\Models\Comentario;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            RoleSeeder::class,
            CategoriaSeeder::class,
        ]);

        // Crear Administrador
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('1234'),
        ])->assignRole('admin');

        // Crear usuarios
        User::factory()->count(10)->create()->each(function ($user) {
            $user->assignRole('user');
        });

        // Crear productos
        Producto::factory()->count(20)->create();

        // Crear pedidos
        Pedido::factory()->count(50)->create();

        // Crear comentarios
        Comentario::factory()->count(50)->create();

    }
}
