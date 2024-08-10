<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $newRole = explode('|', $role);
        $roleName = strtolower ($request->user()->role->label);
        if (!in_array($roleName, $newRole)) {
            return response()->json(['message' => 'You are not authorized to access this route'], 403);
        }

        return $next($request);
    }
}
