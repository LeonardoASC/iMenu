<?php

namespace App\Repositories;

use App\Models\OrderProduct;
use Illuminate\Database\Eloquent\Model;

class OrderProductRepository
{
    protected $model;

    public function __construct(OrderProduct $orderProduct) {
        $this->model = $orderProduct;
    }

    public function getAllWithRelations()
    {
        return $this->model->with(['order', 'product'])->get();
    }

    public function createUserOrder(int $orderId, array $data)
    {
        $data['order_id'] = $orderId;
        $data['status']   = $data['status'] ?? 'preparing';
        $data['quantity'] = $data['quantity'] ?? 1;
        $data['notes']    = $data['notes'] ?? null;

        return $this->model->create($data);
    }

    public function getByOrderId(int $orderId)
    {
        return $this->model
            ->where('order_id', $orderId)
            ->with(['product', 'order.user'])
            ->get();
    }

}
