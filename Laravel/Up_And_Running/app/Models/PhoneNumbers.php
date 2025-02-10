<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhoneNumbers extends Model
{

    protected $table = 'PhoneNumbers';
    protected $primaryKey = 'id';
    public $incrementing = false;
    public function contact(){

        return $this->belongsTo(Contact::class,'contact_id');

    }
}
