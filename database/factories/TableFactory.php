<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Table>
 */
class TableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => $this->faker->randomNumber(2),
            'establishment_id' => $this->faker->numberBetween(1, 10),
            'type' => $this->faker->randomElement(['common', 'vip']),
            'status' => $this->faker->randomElement(['busy', 'free', 'reserved']),
            'qrcode' => null
        ];
    }
}
