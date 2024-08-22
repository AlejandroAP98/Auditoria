<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LifeInsurance;

class LifeInsurancesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $lifeInsurances = LifeInsurance::all();
        if($lifeInsurances){
            return response()-> json($lifeInsurances);
        }else{
            return response()->json("No hay datos...");
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Realiza la validación de los datos del request
    $validated = $request->validate([
        'user_id' => 'required|exists:users,id',
        'start_date' => 'required|date',
        'date_expire' => 'required|date',
        'amount' => 'required|numeric',
        'description' => 'required|string',
    ]);

    try {
        
        // Si no existe, crea un nuevo seguro de vida
        $lifeInsurance = new LifeInsurance();
        $lifeInsurance->user_id = $validated['user_id'];
        $lifeInsurance->start_date = $validated['start_date'];
        $lifeInsurance->date_expire = $validated['date_expire'];
        $lifeInsurance->amount = $validated['amount'];
        $lifeInsurance->description = $validated['description'];

        $lifeInsurance->save();

        return response()->json($lifeInsurance, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $lifeInsurance = LifeInsurance::find($id);
        if($lifeInsurance){
            return response()->json($lifeInsurance);
        }else{
            return response()->json("Life Insurance not found");
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $lifeInsurances=LifeInsurance::find($id);
        if($lifeInsurances){
            $lifeInsurances -> user_id = $request -> user_id;
            $lifeInsurances->start_date = $request ->start_date;
            $lifeInsurances->date_expire = $request ->date_expire;
            $lifeInsurances->amount = $request ->amount;
            $lifeInsurances->description = $request ->description;
            try{
                $lifeInsurances->save();
                return response()->json($lifeInsurances);
            }catch (\Exception $e){
                return response()->json(['error de try' => $e], 500);
            }
        }else{
            return response()->json("Life insurance not found");
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $lifeInsurances = LifeInsurance::find($id);
        if($lifeInsurances)
        try{
            $lifeInsurances->delete();
            return response()->json("Life Insurance deleted");
        }catch (\Exception $e){
            return response()->json(['error' => $e], 500);
        }
        else{
            return response()->json('Life Insurance not found');
        }
    }
}
