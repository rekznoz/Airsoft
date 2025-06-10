<?php

namespace Database\Factories;

use App\Models\Categoria;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->words(3, true),
            'descripcion' => $this->faker->sentence(10),
            'precio' => $this->faker->randomFloat(2, 10, 1000),
            'stock' => $this->faker->numberBetween(0, 100),
            'categoria_id' => Categoria::inRandomOrder()->value('id'),
            'marca' => $this->faker->company,
            'modelo' => strtoupper($this->faker->bothify('Model-##??')),
            'descuento' => $this->faker->randomFloat(2, 0, 100),
            'fps' => $this->faker->numberBetween(100, 500),
            'calibre' => $this->faker->randomElement(['6 mm', '4.5 mm', '5.5 mm']),
            'capacidad_cargador' => $this->faker->numberBetween(10, 300),
            'peso' => $this->faker->randomFloat(2, 0.5, 5.0),
            'imagenes' => [],
            'video_demo' => $this->faker->url(),
            'tiempo_envio' => $this->faker->randomElement(['24h', '48h', '3-5 días']),
            'estado_activo' => $this->faker->boolean(90),
        ];
    }
}
