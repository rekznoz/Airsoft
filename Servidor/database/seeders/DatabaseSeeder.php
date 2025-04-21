<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        Permission::create(['name' => 'create tarea']);
        Permission::create(['name' => 'edit tarea']);
        Permission::create(['name' => 'delete tarea']);

        Permission::create(['name' => 'create comentario']);
        Permission::create(['name' => 'edit comentario']);
        Permission::create(['name' => 'delete comentario']);

        $admin = Role::findByName('admin');
        $admin->givePermissionTo(['create tarea', 'edit tarea', 'delete tarea', 'create comentario', 'edit comentario', 'delete comentario']);

        $user = Role::findByName('user');
        $user->givePermissionTo(['create tarea', 'edit tarea', 'delete tarea', 'create comentario', 'edit comentario', 'delete comentario']);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('1234'),
        ])->assignRole('admin');

        $this->call([
            TareaSeeder::class,
        ]);

    }
}
