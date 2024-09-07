<?php


namespace App\Http\Controllers;

class FirstController extends Controller {

    public function Index($id){
            if($id*2>10)
                return $id;
            else
            return "this is awful!";

    }

}
