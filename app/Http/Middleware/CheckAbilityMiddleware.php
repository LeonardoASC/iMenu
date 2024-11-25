<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Silber\Bouncer\BouncerFacade as Bouncer;

class CheckAbilityMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $permission): Response
    {
        if (!Bouncer::allows($permission)) {
            abort(403, 'Você não tem permissão para acessar essa página.');
        }
        return $next($request);
    }
}
