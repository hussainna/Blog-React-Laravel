<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PostController;


Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::get('get-posts',[PostController::class,'index']);
Route::get('search-post/{id}',[PostController::class,'search']);



Route::group(['middleware' => ['auth:sanctum']],function(){

    Route::post('logout',[AuthController::class,'logout']);
    Route::post('insert-post',[PostController::class,'insert']);
    Route::get('get-user-posts',[PostController::class,'userPosts']);


});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
