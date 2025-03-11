<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\Table;
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

        session(['user_id' => $myuser->id]);

        $table = Table::first(); //mudar aqui para quando criar o qrcode(o qrcode que vai informar o id da mesa)
        if (!$table) {
            return redirect()->back()->withErrors(['mesa' => 'Não há mesas disponíveis. Entre em contato com o estabelecimento.']);
        }
        
        $order = Order::firstOrCreate(
            ['user_id' => $myuser->id, 'status' => 'open'],
            [
                'table_id' => $table->id, 
                'total' => null,
            ]
        );
        session(['order_id' => $order->id]);

        return redirect()->route('menu.index');
    }
}
