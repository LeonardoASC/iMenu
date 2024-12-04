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
            'name' => 'Mateus',
            'last_name' => 'Admin',
            'email' => 'admin@email.com',
            'phone' => '11999999999',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);

        $admin1 = User::create(
        [
            'name' => 'leonardo',
            'last_name' => 'chaves',
            'email' => 'leonardoaschaves@gmail.com',
            'phone' => '11999999999',
            'email_verified_at' => now(),
            'password' => bcrypt('123123123'),
        ]);

        $waiter = User::create(
        [
                'name' => 'Joao Garçom',
                'email' => 'garcon@email.com',
                'email_verified_at' => now(),
                'phone' => '11999999999',
                'password' => bcrypt('password'),
        ]);


        $admin->assign('admin');
        $admin1->assign('admin');
        $waiter->assign('waiter');

        User::factory(10)->create();
    }
}
