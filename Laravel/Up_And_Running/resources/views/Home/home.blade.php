<!-- call layouts -->
@extends('layouts.master')



<!-- content should be add to page  -->


@section('container')
    The number is {{ json_encode($users) }}<br>

    {{-- @foreach ($users as $user)
        The number is {{ json_encode() }}<br>
    @endforeach --}}
@endsection

@section('footerScript')
    Content
@endsection
