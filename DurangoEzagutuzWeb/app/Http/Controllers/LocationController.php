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
    
        try {
            $validatedData = $request->validate([
                'position' => 'required|integer',
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'explanation' => 'required|string|max:255',
                'lat' => 'required|numeric',
                'lon' => 'required|numeric', // Cambiado de 'long' a 'lon' para coincidir con la base de datos
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
    
        $location->fill($validatedData);
        $location->save();
    
        return response()->json([
            'message' => 'Location updated successfully',
            'data' => $location,
        ], 200);
    }

    // GET BY ID
    public function getById($id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json([
                'message' => 'Location not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Location retrieved successfully',
            'data' => $location,
        ], 200);
    }
}
