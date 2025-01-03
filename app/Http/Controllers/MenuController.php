<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Product;
use App\Models\Category;
use App\Repositories\MenuRepository;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use Inertia\Inertia;

class MenuController extends Controller
{
    private $menuRepository;

    public function __construct(MenuRepository $repository) {
        $this->menuRepository = $repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {  
        $categories = $this->menuRepository->getCategoriesWithProducts();

        return Inertia::render('Public/Menu/Index', [
            'email' => session('email'),
            'order_id' => session('order_id'),
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
     * Display the specified resource.
     */
    public function showProduct(Product $product)
    {
        $product = $this->menuRepository->getProductWithCategory($product->id);

        return Inertia::render('Public/Menu/Show', compact('product'));
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
