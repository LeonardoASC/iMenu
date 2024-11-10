<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'cpf' => ['required', 'string', 'min:11', 'max:11'],
        ]);

        session(['cpf' => $request->input('cpf')]);

        return redirect()->route('menu.index');
    }
}
