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
        // dd($orders->toarray());
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

    public function userOrder(Request $request)
    {
        $userId = session('user_id');
        $orders = $this->orderRepository->getUserOrders($userId, $request->status);
        return Inertia::render('Public/Menu/UserOrder', compact('orders'));
    }

    public function command()
    {
        $userId = session('user_id');

        $orders = $this->orderRepository->getUserOrdersWithProducts($userId, 'open');
        $totals = $this->orderRepository->calculateOrderTotals($orders);

        return Inertia::render('Public/Menu/Command', [
            'orders' => $orders,
            'subtotal' => $totals['subtotal'],
            'taxes' => $totals['taxes'],
            'delivery' => $totals['delivery'],
            'total' => $totals['total'],
        ]);
    }


    public function finishcomand($id)
    {
        session()->flush();
        $order = $this->orderRepository->finishComand($id);

        if (!$order) {
            return Redirect::to('/')->with('error', 'Comanda não encontrada');
        }

        return Redirect::to('/')->with('success', 'Comanda finalizada com sucesso');
    }


    public function chat(){
        return Inertia::render('Public/Chat/Index');
    }


}
