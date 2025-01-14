<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiaryEntryController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\TrainingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//dodata ruta za seminarski
Route::middleware('auth:sanctum')->get('/trainings/statistics', [TrainingController::class, 'statistics']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profiles', [ProfileController::class, 'index']);
    Route::get('/profiles/{id}', [ProfileController::class, 'show']);
    Route::post('/profiles', [ProfileController::class, 'store']);
    Route::put('/profiles/{id}', [ProfileController::class, 'update']);
    Route::delete('/profiles/{id}', [ProfileController::class, 'destroy']);

    Route::resource('trainings', TrainingController::class)->only([
        'index', 'show', 'store', 'update', 'destroy'
    ]);

    Route::apiResource('exercises', ExerciseController::class);
    Route::apiResource('diary-entries', DiaryEntryController::class);
  



    //za admin deo za seminarski
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/{id}', [NotificationController::class, 'show']);
    Route::post('/notifications', [NotificationController::class, 'store']);
    Route::put('/notifications/{id}', [NotificationController::class, 'update']);
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);


    Route::get('/admin/user-goals', [AdminController::class, 'userGoalsStatistics']);
    Route::get('/admin/training-durations', [AdminController::class, 'trainingDurationStatistics']);
});
Route::middleware('auth:sanctum')->get('/users', [AuthController::class, 'getAllUsers']);
Route::middleware('auth:sanctum')->patch('/users/{id}/role', [AuthController::class, 'changeUserRole']);


