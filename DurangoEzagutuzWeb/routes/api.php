<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LocationController;
use App\Http\Controllers\MatchImgController;
use App\Http\Controllers\MatchPairController;
use App\Http\Controllers\QuizController;

// Location
Route::get('/locations', [LocationController::class, 'index']);
Route::put('/locations/{id}', [LocationController::class, 'update']);

// Match_img
Route::get('/match-imgs', [MatchImgController::class, 'index']);
Route::put('/match-imgs/{id}', [MatchImgController::class, 'update']);

// Match_pair
Route::get('/match-pairs', [MatchPairController::class, 'index']);
Route::put('/match-pairs/{id}', [MatchPairController::class, 'update']);

// Quiz
Route::get('/quizzes', [QuizController::class, 'index']);
Route::put('/quizzes/{id}', [QuizController::class, 'update']);

