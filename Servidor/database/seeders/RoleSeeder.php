<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear roles si no existen
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Lista de permisos organizados por entidad
        $permissions = [
            // Productos
            'agregar producto',
            'editar producto',
            'eliminar producto',

            // Categorías
            'agregar categoria',
            'editar categoria',
            'eliminar categoria',

            // Pedidos
            'agregar pedido',
            'editar pedido',
            'eliminar pedido',

            // Comentarios
            'agregar comentario',
            'editar comentario',
            'eliminar comentario',
        ];

        // Crear permisos sin duplicar
        foreach ($permissions as $permiso) {
            Permission::firstOrCreate(['name' => $permiso]);
        }

        // Asignar todos los permisos al rol admin
        $adminRole->syncPermissions($permissions);

        // Asignar permisos específicos al rol user
        $userPermissions = [
            'agregar pedido',
            'eliminar pedido',
            'agregar comentario',
            'editar comentario',
            'eliminar comentario',
        ];

        $userRole->syncPermissions($userPermissions);
    }
}
