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
        $admin = User::create(
        [
            'name' => 'Mateus Admin',
            'email' => 'admin@email.com',
            'email_verified_at' => now(),
            'password' => '$2y$12$zMsKaz6nqgSprY.0R.bEZuL5dvuUpA7EDxw1ec1HJ4EmmlaA.JIyO', // password
        ]);

        $admin1 = User::create(
        [
            'name' => 'leonardo',
            'email' => 'leonardoaschaves@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('123123123'),
        ]);

        $waiter = User::create(
        [
                'name' => 'Mateus Admin',
                'email' => 'garcon@email.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
        ]);


        $admin->assignRole('admin');
        $admin1->assignRole('admin');
        $waiter->assignRole('waiter');

        User::factory(10)->create();
    }
}
