<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderProduct;
use App\Models\Order;
use Inertia\Inertia;

class OrderProductController extends Controller
{
    public function index()
    {
        $orderProducts = OrderProduct::with(['order', 'product'])->get();

        return inertia('Admin/OrderProduct/Index', compact('orderProducts'));
    }

    public function createUserOrder(Request $request)
    {
        // Validação dos dados recebidos
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'status'
        ]);

        // Obtém o ID da comanda ativa da sessão
        $orderId = session('order_id');

        if (!$orderId) {
            return response()->json(['message' => 'Nenhuma comanda ativa.'], 400);
        }

        // Criação do registro na tabela order_product
        $orderProduct = OrderProduct::create([
            'order_id' => $orderId,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'status' => 'preparing',
        ]);

        return redirect()->route('menu.index')->with('message', 'Produto adicionado ao pedido com sucesso!');
    }

    public function orderProducts($id)
    {
        $orderProducts = OrderProduct::where('order_id', $id)->with(['product', 'order.user'])->get();
        // dd($orderProducts->toArray());
        return Inertia::render('Admin/OrderProduct/Index', compact('orderProducts'));
    }



}
