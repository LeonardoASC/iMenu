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

        return $this->model->create($data);
    }

}
