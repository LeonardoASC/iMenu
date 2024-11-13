<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\OrderSeeder;
use App\Models\Order;
use App\Models\Product;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::factory(10)->create();

        Order::factory(10)->create()->each(function ($order) use ($products) {
            $orderProducts = $products->random(rand(1, 5));

            foreach ($orderProducts as $product) {
                $order->products()->attach($product->id, [
                    'quantity' => rand(1, 5),
                    'price' => $product->price,
                ]);
            }
        });
    }
}
