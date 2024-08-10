<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;



class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $users= new User();{
            $users->id_role = $request->id_role;
            $users->name = $request->name;
            $users->last_name = $request->last_name;
            $users->document_type = $request->document_type;
            $users->document_number = $request->document_number;
            $users->address = $request->address;
            $users->email = $request->email;
            $users->password = $request->password;
            try{
                $users->save();
                return response()->json($users);
            }catch (\Exception $e){
                return response()->json(['error' => $e], 500);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::find($id);
        return response()->json($user);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $users = User::find($id);
        if($users){
            $users->id_role = $request->id_role;
            $users->name = $request->name;
            $users->last_name = $request->last_name;
            $users->document_type = $request->document_type;
            $users->document_number = $request->document_number;
            $users->address = $request->address;
            $users->email = $request->email;
            $users->password = $request->password;
            try{
                $users->save();
                return response()->json($users);
            }catch (\Exception $e){
                return response()->json(['error' => $e], 500);
            }
        }else{
            return response()->json('User not found');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $users = User::find($id);
        if($users){
            try{
                $users->delete();
                return response()->json('User deleted');
            }catch (\Exception $e){
                return response()->json(['error' => $e], 500);
            }
        }else{
            return response()->json('User not found');
        }
    }
}
