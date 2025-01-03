<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;

class MenuRepository
{

    public function getCategoriesWithProducts()
    {
        return Category::with('products')
            ->orderBy('name')
            ->where('status', 'Enable')
            ->has('products')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'status' => $category->status,
                    'image' => $category->image,
                    'products' => $category->products->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'name' => $product->name,
                            'description' => $product->description,
                            'price' => $product->price,
                            'status' => $product->status,
                            'image' => $product->image,
                            'created_at' => $product->created_at->format('d-m-Y'),
                        ];
                    }),
                ];
            });
    }

    public function getProductWithCategory(int $productId)
    {
        return Product::with('category')->findOrFail($productId);
    }

}
