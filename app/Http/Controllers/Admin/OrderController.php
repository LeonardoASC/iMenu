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
        $orders = OrderProduct::query()
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->whereHas('order', function ($query) {
                $query->where('user_id', 1)->where('status', 'open');
            })
            ->with('order', 'product')
            ->get();

        return Inertia::render('Public/Menu/UserOrder', compact('orders'));
    }

    public function command()
    {
        $orders = $this->getOrdersWithProducts(1, 'open');
        $totals = $this->calculateOrderTotals($orders);

        return Inertia::render('Public/Menu/Command', [
            'orders' => $orders,
            'subtotal' => $totals['subtotal'],
            'taxes' => $totals['taxes'],
            'delivery' => $totals['delivery'],
            'total' => $totals['total'],
        ]);
    }

    /**
     * Recupera as ordens do usuário com status e carrega os produtos.
     *
     * @param int $userId
     * @param string $status
     * @return \Illuminate\Support\Collection
     */
    protected function getOrdersWithProducts(int $userId, string $status)
    {
        return Order::where('status', $status)
            ->where('user_id', $userId)
            ->with(['products' => function ($query) {
                $query->wherePivot('status', 'delivered')->withPivot('quantity', 'price', 'status');
            }])->get();
    }

    /**
     * Calcula os valores totais das ordens.
     *
     * @param \Illuminate\Support\Collection $orders
     * @return array
     */
    protected function calculateOrderTotals($orders)
    {
        $subtotal = $orders->sum(function ($order) {
            return $order->products->sum(function ($product) {
                return (float) $product->pivot->price * $product->pivot->quantity;
            });
        });

        $taxes = 10.0;
        $delivery = 5.0;

        return [
            'subtotal' => $subtotal,
            'taxes' => $taxes,
            'delivery' => $delivery,
            'total' => $subtotal + $taxes + $delivery,
        ];
    }

    public function finishcomand($id)
    {
        session()->flush();
        $order = Order::find($id);
    
        if (!$order) {
            return Redirect::to('/')->with('error', 'Comanda não encontrada');
        }

        $order->status = 'closed';
        $order->save();

        return Redirect::to('/')->with('success', 'Comanda finalizada com sucesso');
    }
    

    public function chat(){
        return Inertia::render('Public/Chat/Index');
    }


}
