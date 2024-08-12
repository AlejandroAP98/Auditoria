<?php

namespace App\Http\Controllers;

use App\Models\Credits;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CreditsController extends Controller
{
    /**
     * Muestra una lista de créditos.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $credits = Credits::all(); // Puedes ajustar la consulta según sea necesario

        return response()->json($credits);
    }

    /**
     * Muestra los detalles de un crédito específico.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $credit = Credits::find($id);

        if (!$credit) {
            return response()->json(['message' => 'Credit not found'], 404);
        }

        return response()->json($credit);
    }

    /**
     * Crea un nuevo crédito.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'interest_rate' => 'required|numeric',
            'amount' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'status' => 'required|string',
        ]);

        $credit = Credits::create($validated);

        return response()->json($credit, 201);
    }

    /**
     * Actualiza un crédito existente.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $credit = Credits::find($id);

        if (!$credit) {
            return response()->json(['message' => 'Credit not found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'interest_rate' => 'sometimes|numeric',
            'amount' => 'sometimes|numeric',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',
            'status' => 'sometimes|string',
        ]);

        $credit->update($validated);

        return response()->json($credit);
    }

    /**
     * Elimina un crédito.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $credit = Credits::find($id);

        if (!$credit) {
            return response()->json(['message' => 'Credit not found'], 404);
        }

        $credit->delete();

        return response()->json(['message' => 'Credit deleted successfully']);
    }
}
