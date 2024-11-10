<?php

namespace Database\Seeders;

use App\Models\Establishment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstablishmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Establishment::factory(10)->create();
    }
}
