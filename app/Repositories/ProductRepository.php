<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    protected $model;

    public function __construct(Product $Product) {
        $this->model = $Product;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function getAll($request = null)
    {
        return $this->model
            ->withTrashed()
            ->filter($request ? $request->only(['name']) : null)
            ->with(['category'])
            ->orderBy('name')
            ->paginate(10)
            ->through(function ($product) {
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
                    ],
                ];
            });
    }

    public function findById($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($data, $model)
    {
        $model->update($data);

        return $model;
    }

    public function destroy($model)
    {
        return $model->delete();
    }

    public function restore($model)
    {
        return $model->restore();
    }

    public function forceDelete($model)
    {
        return $model->forceDelete();
    }

}
