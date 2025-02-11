<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    // GET
    public function index()
    {
        $quizzes = Quiz::all();
        return response()->json($quizzes);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->update($request->all());
        return response()->json(['message' => 'Quiz updated successfully', 'data' => $quiz]);
    }

    // GET BY ID
    public function getById($id)
    {
        $quiz = Quiz::find($id);

        if (!$quiz) {
            return response()->json([
                'message' => 'Quiz not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Quiz retrieved successfully',
            'data' => $quiz,
        ], 200);
    }
}
