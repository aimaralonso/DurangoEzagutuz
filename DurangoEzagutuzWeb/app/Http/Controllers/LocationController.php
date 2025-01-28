<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LocationController extends Controller
{
    // GET
    public function index()
    {
        $locations = Location::all();
        return response()->json($locations);
    }

    // UPDATE
    public function update(Request $request, $id): JsonResponse
    {
        // Buscar la ubicación por ID
        $location = Location::find($id);
    
        if (!$location) {
            return response()->json([
                'message' => 'Location not found',
            ], 404);
        }
    
        // Validar los datos del request
        try {
            $validatedData = $request->validate([
                'position' => 'required|integer',
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'explanation' => 'required|string|max:255',
                'lat' => 'required|numeric',
                'long' => 'required|numeric',
                'img' => 'required|string|max:255',
                'audio' => 'nullable|string|max:255',
                'video' => 'nullable|string|max:255',
                'time' => 'required|integer',
                'activity' => 'required|string|max:255',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    
        // Actualizar los datos en el modelo
        $location->fill($validatedData);
        $location->save();
    
        // Respuesta JSON con los datos actualizados
        return response()->json([
            'message' => 'Location updated successfully',
            'data' => $location,
        ], 200);
    }
}
