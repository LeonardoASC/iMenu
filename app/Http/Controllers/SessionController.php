<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');
        session(['email' => $email]);

        $myuser = User::firstOrCreate(
            ['email' => $email],
            ['name' => 'Cliente Anônimo']
        );
        session(['user_id' => $myuser->id ]);

        $order = Order::firstOrCreate(
            ['user_id' => $myuser->id, 'status' => 'open'],
            [
                'table_id' => 1,
                'total' => null,
            ]
        );
        session(['order_id' => $order->id]);

        return redirect()->route('menu.index');
    }

}
