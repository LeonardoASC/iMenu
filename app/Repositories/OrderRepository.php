<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderProduct;

class OrderRepository
{
    protected $model;
    protected $orderProductModel;

    public function __construct(Order $Order, OrderProduct $orderProduct) {
        $this->model = $Order;
        $this->orderProductModel = $orderProduct;
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

    public function getUserOrders($userId, $status = null)
    {
        return $this->orderProductModel
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->whereHas('order', function ($query) use ($userId) {
                $query->where('user_id', $userId)
                      ->where('status', 'open');
            })
            ->with('order', 'product')
            ->get();
    }

     /**
     * Recupera as ordens do usuário com status "open" (ou outro)
     * e carrega apenas os produtos com pivot.status = 'delivered'.
     */
    public function getUserOrdersWithProducts(int $userId, string $status = 'open')
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('status', $status)
            ->with(['products' => function ($query) {
                $query->wherePivot('status', 'delivered')
                      ->withPivot('quantity', 'price', 'status');
            }])
            ->get();
    }

    /**
     * Calcula os valores totais das ordens (subtotal, taxas, entrega e total).
     */
    public function calculateOrderTotals($orders)
    {
        $subtotal = $orders->sum(function ($order) {
            return $order->products->sum(function ($product) {
                return (float) $product->pivot->price * $product->pivot->quantity;
            });
        });

        $taxes = $subtotal > 0 ? 10.0 : 0.0;
        $delivery = $subtotal > 0 ? 15.0 : 0.0;

        return [
            'subtotal' => $subtotal,
            'taxes'    => $taxes,
            'delivery' => $delivery,
            'total'    => $subtotal + $taxes + $delivery,
        ];
    }

    public function finishComand(int $id)
    {
        $order = $this->model->find($id);

        if (!$order) {
            return null;
        }

        $order->status = 'closed';
        $order->save();

        return $order;
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
