<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckSessionData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Verificar se todos os dados necessários estão presentes e não estão vazios
        $session = $request->session();
        $requiredFields = ['email', 'order_id', 'user_id'];

        foreach ($requiredFields as $field) {
            if (!$session->has($field) || empty($session->get($field))) {
                return redirect('/')
                    ->with('error', 'Você precisa estar autenticado e ter uma sessão válida.');
            }
        }

        return $next($request);
    }
}
