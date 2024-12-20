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
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($order) {
                    return [
                        'id' => $order->id,
                        'table' => [
                            'id' => $order->table->id,
                            'number' => $order->table->number,
                            'establishment' => [
                                'id' => $order->table->establishment->id,
                                'name' => $order->table->establishment->name,
                            ],
                        ],
                        'user' => [
                            'id' => $order->user->id,
                            'name' => $order->user->name,
                            'email' => $order->user->email,
                        ],
                        'status' => $order->status,
                        'notes' => $order->notes,
                        // 'payment_method' => $order->payment_method,
                        'total' => $order->total,
                        'created_at' => $order->created_at->format('d-m-Y'),
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
