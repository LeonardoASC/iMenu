<?php

namespace Database\Factories;

use App\Models\Charge;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Charge>
 */
class ChargeFactory extends Factory
{
    protected $model = Charge::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Service Charge',
                'Cover Charge',
                'Gratuity',
                'Corkage Fee',
                'Reservation Fee',
                'Cancellation Fee',
            ]),
            'value' => $this->faker->numberBetween(5, 50),
            'description' => $this->faker->sentence(),
            'type' => $this->faker->randomElement([
                'service',
                'cover',
                'gratuity',
                'corkage',
                'reservation',
                'cancellation',
            ]),
            'is_optional' => $this->faker->boolean(50),
            'status' => $this->faker->randomElement(['Enable', 'Disable']),
        ];
    }
}
