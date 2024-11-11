<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Carbon\Carbon;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $categories = [
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 1',
                'status' => 'Enable',
                'created_at'=> Carbon::now(),
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 2',
                'status' => 'Enable',
                'created_at'=> Carbon::now(),
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 3',
                'status' => 'Enable'
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 4',
                'status' => 'Enable'
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 5',
                'status' => 'Enable'
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 6',
                'status' => 'Enable'
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 7',
                'status' => 'Enable'
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 8',
                'status' => 'Enable'
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 9',
                'status' => 'Enable'
            ],
            [
                'image' => 'https://placehold.co/600x400/png',
                'name' => 'Category 10',
                'status' => 'Enable'
            ],

        ];

        foreach ($categories as $category) {
           Category::create($category);
        }
    }
}
