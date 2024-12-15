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

      public function orderProducts($id)
      {
        $orderProducts = OrderProduct::where('order_id', $id)->with(['product', 'order.user'])->get();
        // dd($orderProducts->toArray());
        return Inertia::render('Admin/OrderProduct/Index', compact('orderProducts'));
      }
      
      
      
}
