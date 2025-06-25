<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\TenantSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            TenantSeeder::class,
            UserSeeder::class,
            EstablishmentSeeder::class,
            CategorySeeder::class,
            TableSeeder::class,
            ProductSeeder::class,
            OrderSeeder::class,
            RolesAndAbilitiesSeeder::class,
        ]);
    }
}
