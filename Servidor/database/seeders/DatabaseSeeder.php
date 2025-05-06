<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);

        // Permisos para PRODUCTOS
        Permission::create(['name' => 'agregar producto']);
        Permission::create(['name' => 'editar producto']);
        Permission::create(['name' => 'eliminar producto']);

        // Permisos para CATEGORIAS
        Permission::create(['name' => 'agregar categoria']);
        Permission::create(['name' => 'editar categoria']);
        Permission::create(['name' => 'eliminar categoria']);

        // Permisos para PEDIDOS
        Permission::create(['name' => 'agregar pedido']);
        Permission::create(['name' => 'editar pedido']);
        Permission::create(['name' => 'eliminar pedido']);

        // Permisos para COMENTARIOS
        Permission::create(['name' => 'agregar comentario']);
        Permission::create(['name' => 'editar comentario']);
        Permission::create(['name' => 'eliminar comentario']);

        $admin = Role::findByName('admin');
        $admin->givePermissionTo([
            // permisos para productos
            'agregar producto',
            'editar producto',
            'eliminar producto',
            // permisos para categorias
            'agregar categoria',
            'editar categoria',
            'eliminar categoria',
            // permisos para pedidos
            'agregar pedido',
            'editar pedido',
            'eliminar pedido',
            // permisos para comentarios
            'agregar comentario',
            'editar comentario',
            'eliminar comentario',
        ]);

        $user = Role::findByName('user');
        $user->givePermissionTo([
            // permisos para pedidos
            'agregar pedido',
            'eliminar pedido',
            // permisos para comentarios
            'agregar comentario',
            'editar comentario',
            'eliminar comentario',
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('1234'),
        ])->assignRole('admin');

        $this->call([
            CategoriaSeeder::class,
        ]);

        Producto::factory()->count(20)->create();

    }
}
