<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class CategoryController extends Controller
{
    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::paginate(5)->through(function ($category) {
            return [
                'id' => $category->id,
                'image' => $category->image,
                'name' => $category->name,
                'status' => $category->status,
                'created_at' => $category->created_at->format('d-m-Y'),
            ];
        });

        return Inertia::render('Admin/Category/Index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('categories', 'public'); 
        }

        $category = $this->categoryRepository->create($data);

        return Redirect::route('category.show', $category->id)->with('message', 'Categoria cadastrada com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        if ($category->image) {
            $category->image = '/storage/' . $category->image;
        }
        return Inertia::render('Admin/Category/Show', compact('category'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Category/Edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // excluir a imagem antiga
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

        $data['image'] = $request->file('image')->store('categories', 'public');
    }

        $category = $this->categoryRepository->update($data, $category);

        return Redirect::route('category.show', $category->id)->with('message', 'Categoria atualizada com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->categoryRepository->destroy($category);

        return Redirect::route('categories.index')->with('message', 'Categoria desativada com sucesso.');
    }

    public function restore(Category $category)
    {
        $this->categoryRepository->restore($category);
        return Redirect::route('categories.index')->with('message', 'Categoria reativada com sucesso.');
    }

    public function forceDelete(Category $category)
    {
        $this->categoryRepository->forceDelete($category);
        return Redirect::route('categories.index')->with('message', 'Categoria excluída permanentemente.');
    }
}
