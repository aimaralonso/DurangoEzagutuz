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
Route::get('/locations/{id}', [LocationController::class, 'getById']);

// Match_img
Route::get('/match-imgs', [MatchImgController::class, 'index']);
Route::put('/match-imgs/{id}', [MatchImgController::class, 'update']);
Route::get('/match-imgs/{id}', [MatchImgController::class, 'getById']);

// Match_pair
Route::get('/match-pairs', [MatchPairController::class, 'index']);
Route::put('/match-pairs/{id}', [MatchPairController::class, 'update']);
Route::get('/match-pairs/{id}', [MatchPairController::class, 'getById']);

// Quiz
Route::get('/quizzes', [QuizController::class, 'index']);
Route::put('/quizzes/{id}', [QuizController::class, 'update']);
Route::get('/quizzes/{id}', [QuizController::class, 'getById']);

