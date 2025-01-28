<?php

namespace App\Http\Controllers;

use App\Models\Match_img;
use Illuminate\Http\Request;

class MatchImgController extends Controller
{
    // GET
    public function index()
    {
        $matchImgs = Match_img::all();
        return response()->json($matchImgs);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $matchImg = Match_img::findOrFail($id);
        $matchImg->update($request->all());
        return response()->json(['message' => 'Match image updated successfully', 'data' => $matchImg]);
    }

    // GET BY ID
    public function getById($id)
    {
        $matchImg = Match_img::find($id);

        if (!$matchImg) {
            return response()->json([
                'message' => 'MatchImg not found',
            ], 404);
        }

        return response()->json([
            'message' => 'MatchImg retrieved successfully',
            'data' => $matchImg,
        ], 200);
    }
}
