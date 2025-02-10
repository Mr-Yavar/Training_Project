<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use DB;
use Request;

class HomeController extends Controller {
    public function __construct() {}

    public function Index(){
       return response()->json(Contact::all(),200);
    }
    public function save(Request $request)
    {
     // Create and save a new contact from user input
     $contact = new Contact();
     $contact->first_name = $request->input('first_name');

     $contact->last_name = $request->input('last_name');
     $contact->email = $request->input('email');
     $contact->phoneNumbers->number = "555";
     $contact->save();


     

     return redirect('contacts');
    }
    public function show($contactId)
    {
     // Return a JSON representation of a contact based on a URL segment;
     // if the contact doesn't exist, throw an exception
     return Contact::findOrFail($contactId);
    }
    public function vips()
    {
     // Unnecessarily complex example, but still possible with basic Eloquent
     // class; adds a "formalName" property to every VIP entry
     return Contact::where('vip', true)->get()->map(function ($contact) {
     $contact->formalName = "The exalted {$contact->first_name} of the
     {$contact->last_name}s";
     return $contact;
     });
    }
    

}