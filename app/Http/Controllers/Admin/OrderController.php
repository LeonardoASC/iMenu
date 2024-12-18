<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orders = $this->orderRepository->getAll($request);
        return Inertia::render('Admin/Order/Index', ['orders' => $orders]);
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
    public function store(StoreOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }

    public function userOrder()
    {
        $orders  = OrderProduct::where('status', 'preparing')
        ->whereHas('order', function ($query) {
            $query->where('user_id', 1);
        })->with('order')->with('product')->get();

            // dd($orders->toarray());

        return Inertia::render('Public/Menu/UserOrder', compact('orders'));
    }

    // public function userOrder()
    // {
    //     $openOrders = Order::with(['products' => function ($query) {
    //         $query->select('products.id', 'products.name', 'products.price')
    //             ->withPivot('quantity', 'price');
    //     }])->where('user_id', 8)
    //     ->where('status', 'open')
    //     ->get();

    //     $otherOrders = Order::with(['products' => function ($query) {
    //         $query->select('products.id', 'products.name', 'products.price')
    //             ->withPivot('quantity', 'price');
    //     }])->where('user_id', 8)
    //     ->where('status', '!=', 'open')
    //     ->get();

    //     return Inertia::render('Public/Menu/UserOrder', [
    //         'openOrders' => $openOrders,
    //         'otherOrders' => $otherOrders,
    //     ]);
    // }

}
