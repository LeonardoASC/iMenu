<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreOrderProductRequest;
use App\Http\Requests\UpdateOrderProductRequest;
use App\Repositories\OrderProductRepository;
use App\Models\OrderProduct;
use App\Models\Order;
use Inertia\Inertia;


class OrderProductController extends Controller
{

    protected $orderProductRepository;

    public function __construct(OrderProductRepository $orderProductRepository)
    {
        $this->orderProductRepository = $orderProductRepository;
    }

    public function index()
    {
        $orderProducts = $this->orderProductRepository->getAllWithRelations();
        return Inertia::render('Admin/OrderProduct/Index', compact('orderProducts'));
    }

    public function createUserOrder(StoreOrderProductRequest $request)
    {
        $orderId = session('order_id');

        if (!$orderId) {
            return response()->json(['message' => 'Nenhuma comanda ativa.'], 400);
        }

        $this->orderProductRepository->createUserOrder($orderId, $request->validated());

        return redirect()->route('menu.index')->with('message', 'Produto adicionado ao pedido com sucesso!');
    }

    public function orderProducts($id)
    {
        $orderProducts = OrderProduct::where('order_id', $id)->with(['product', 'order.user'])->get();
        // dd($orderProducts->toArray());
        return Inertia::render('Admin/OrderProduct/Index', compact('orderProducts'));
    }



}
