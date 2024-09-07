<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FirstController;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return view('welcome');
});



Route::get('/create',[TaskController::class,"create"]);
Route::any('/',[TaskController::class,"store"])->name("store");
