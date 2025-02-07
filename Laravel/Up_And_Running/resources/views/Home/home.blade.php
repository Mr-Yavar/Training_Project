
<!-- call layouts -->
@extends('layouts.master')



    <!-- content should be add to page  -->


@section('container')


    @for ($i = 0; $i < 10; $i++)
         The number is {{ $i }}<br>
    @endfor
@endsection

@section('footerScript')
Content
@endsection