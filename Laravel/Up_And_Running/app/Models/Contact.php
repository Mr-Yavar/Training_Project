<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{

    protected $table = 'contacts_secondary';
    protected $primaryKey = 'id';
    public $incrementing = false;

    public function phoneNumbers(){

        return $this->hasOne(PhoneNumbers::class,'contact_id','id');

    }

}
