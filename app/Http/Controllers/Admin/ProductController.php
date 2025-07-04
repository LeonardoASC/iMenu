<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = $this->productRepository->getAll($request);
        return Inertia::render('Admin/Product/Index', ['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categoriesEnable = Category::where('status', 'Enable')->get();
        return Inertia::render('Admin/Product/Create', ['categoriesEnable' => $categoriesEnable]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public'); 
        }
        
        $product = $this->productRepository->create($data);

        return Redirect::route('product.index', $product->id)->with('message', 'Produto cadastrada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $categoriesEnable = Category::where('status', 'Enable')->get();
        $product->load('category');
        if ($product->image) {
            $product->image = $product->image;
        }
        return Inertia::render('Admin/Product/Show', compact('product', 'categoriesEnable'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::where('status', 'Enable')->get();
        return Inertia::render('Admin/Product/Edit', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

        $data['image'] = $request->file('image')->store('products', 'public');
        } else {
            unset($data['image']);
        }

        $product = $this->productRepository->update($data, $product);

        return Redirect::route('product.index', $product->id)->with('message', 'Produto atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->productRepository->destroy($product);
        return Redirect::route('product.index')->with('message', 'Produto desativada com sucesso.');
    }

    public function restore(Product $product)
    {
        $this->productRepository->restore($product);
        return Redirect::route('product.index')->with('message', 'Produto ativada com sucesso.');
    }

    public function forceDelete(Product $product)
    {
        $this->productRepository->forceDelete($product);
        return Redirect::route('product.index')->with('message', 'Produto excluída com sucesso.');
    }
}
