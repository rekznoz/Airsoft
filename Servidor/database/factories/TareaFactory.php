<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tarea>
 */
class TareaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $status = $this->faker->randomElement(['pendiente', 'en_proceso', 'terminada']);
        return [
            //
            'nombre' => $this->faker->sentence(3),
            'descripcion' => $this->faker->paragraph(3),
            'fecha_inicio' => $this->faker->date(),
            'fecha_fin' => $this->faker->date(),
            'estado' => $status,
            'user_id' => User::factory(),
        ];
    }
}
