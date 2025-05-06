<?php

namespace Database\Factories;

use App\Models\Producto;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comentario>
 */
class ComentarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'producto_id' => Producto::inRandomOrder()->first()?->id ?? Producto::factory(),
            'comentario' => $this->faker->sentence(),
            'calificacion' => $this->faker->numberBetween(1, 10),
        ];
    }
}
