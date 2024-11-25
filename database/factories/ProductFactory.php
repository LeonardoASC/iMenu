<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define o estado padrão do modelo.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true), 
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 5, 200),
            'status' => $this->faker->randomElement(['Enable', 'Disable']),
            'image' => $this->faker->imageUrl(640, 480, 'products', true, 'Faker'),
            'category_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
