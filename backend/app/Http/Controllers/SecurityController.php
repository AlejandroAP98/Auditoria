<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SecurityController extends Controller
{
    //
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response(['message' => 'No autorizado para ingreso'], 401);
        }
    }
    public function logout(){
        auth()->user()->tokens()->delete();
        return response(['message' => 'Successfully logged out']);
    }

}
