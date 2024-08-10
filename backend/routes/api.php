<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\LifeInsurancesController;
use App\Http\Controllers\SecurityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::apiResource('users', UsersController::class);
Route::apiResource('lifeInsurances', LifeInsurancesController::class);
// Route::post('/login', [SecurityController::class, 'login']);


// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/logout', [SecurityController::class, 'logout']);
//     Route::get('/users', [UsersController::class, 'index']);
//     Route::get('/users/{id}', [UsersController::class, 'show']);
//     Route::post('/users', [UsersController::class, 'store']);
//     Route::put('/users/{id}', [UsersController::class, 'update']);
//     Route::delete('/users/{id}', [UsersController::class, 'destroy']);

//     Route::get('/lifeInsurances', [LifeInsurancesController::class, 'index']);
//     Route::get('/lifeInsurances/{id}', [LifeInsurancesController::class, 'show']);
//     Route::post('/lifeInsurances', [LifeInsurancesController::class, 'store']);
//     Route::put('/lifeInsurances/{id}', [LifeInsurancesController::class, 'update']);
//     Route::delete('/lifeInsurances/{id}', [LifeInsurancesController::class, 'destroy']);
// });


// Route::middleware('role:admin')->group(function () {
//     Route::get('/users', [UsersController::class, 'index']);
//     Route::get('/users/{id}', [UsersController::class, 'show']);
//     Route::post('/users', [UsersController::class, 'store']);
//     Route::put('/users/{id}', [UsersController::class, 'update']);
//     Route::delete('/users/{id}', [UsersController::class, 'destroy']);

//     Route::get('/lifeInsurances', [LifeInsurancesController::class, 'index']);
//     Route::get('/lifeInsurances/{id}', [LifeInsurancesController::class, 'show']);
//     Route::post('/lifeInsurances', [LifeInsurancesController::class, 'store']);
//     Route::put('/lifeInsurances/{id}', [LifeInsurancesController::class, 'update']);
//     Route::delete('/lifeInsurances/{id}', [LifeInsurancesController::class, 'destroy']);
// });

