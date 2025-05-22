<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Middleware\TelescopeMiddleware;
use Illuminate\Support\Facades\Route;

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

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::group([
    'middleware' => ['api', TelescopeMiddleware::class],
    'prefix' => 'auth'
], function () {
    Route::post('login'     , [AuthController::class, 'login'   ])->name('login');
    Route::post('logout'    , [AuthController::class, 'logout'  ])->name('logout');
    Route::post('refresh'   , [AuthController::class, 'refresh' ])->name('refresh');
    Route::post('me'        , [AuthController::class, 'me'      ])->name('me');
    Route::post('register'  , [AuthController::class, 'register'])->name('register');

    // get usuarios
    Route::get('users'     , [AuthController::class, 'listUsers'])->name('users');
    Route::get('users/{id}', [AuthController::class, 'getUser' ])->name('user');
});

Route::apiResource('categorias' , CategoriaController::class)->middleware(['api', TelescopeMiddleware::class]);

Route::apiResource('pedidos'    , PedidoController::class)->middleware(['api', TelescopeMiddleware::class]);

Route::apiResource('productos'  , ProductoController::class)->middleware(['api', TelescopeMiddleware::class]);

Route::apiResource('comentarios', ComentarioController::class)->middleware(['api', TelescopeMiddleware::class]);
