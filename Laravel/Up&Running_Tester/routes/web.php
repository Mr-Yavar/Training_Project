<?php

use Illuminate\Support\Facades\Route;


Route::any('/',function(){
    return response()->json("",200,"");
});



//Route::get('/create',[TaskController::class,"create"]);
// Route::any('/',[TaskController::class,"store"])->name("store");
