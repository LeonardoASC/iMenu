<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::with('products')
        ->orderBy('name')->where("status", "Enable")
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
        
        $products = Product::with('category')
            ->orderBy('category_id')
            ->orderBy('name')
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'status' => $product->status,
                    'image' => $product->image,
                    'created_at' => $product->created_at->format('d-m-Y'),
                    'category' => [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                        'status' => $product->category->status,
                        'image' => $product->category->image,
                    ],
                ];
            });
        return Inertia::render('Public/Menu/Index', [
            'email' => session('email'),
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMenuRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMenuRequest $request, Menu $menu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        //
    }
}
