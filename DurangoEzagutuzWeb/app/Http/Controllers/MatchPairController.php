<?php

namespace App\Http\Controllers;

use App\Models\Match_pair;
use Illuminate\Http\Request;

class MatchPairController extends Controller
{
    // GET
    public function index()
    {
        $matchPairs = Match_pair::all();
        return response()->json($matchPairs);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $matchPair = Match_pair::findOrFail($id);
        $matchPair->update($request->all());
        return response()->json(['message' => 'Match pair updated successfully', 'data' => $matchPair]);
    }
}
