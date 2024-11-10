<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Mateus',
            'email' => 'mateus@email.com',
            'email_verified_at' => now(),
            'password' => '$2y$12$zMsKaz6nqgSprY.0R.bEZuL5dvuUpA7EDxw1ec1HJ4EmmlaA.JIyO', // password
        ]);

        User::factory(10)->create();
    }
}
