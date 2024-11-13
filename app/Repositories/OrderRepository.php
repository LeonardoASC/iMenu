<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    protected $model;

    public function __construct(Order $Order) {
        $this->model = $Order;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function getAll($request = null)
    {
        return $this->model
            ->withTrashed()
            ->filter($request ? $request->only(['status']) : null)
            ->orderBy('status')
            ->orderBy('created_at', 'desc')
            ->paginate(15);
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
