<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- yield,section/show is called when we want add content later  -->
    <title>@yield('title','Home')</title>
    <style>


        </style>
</head>
<body>
    <div class="container">@yield('container')</div>
    <div>
        @include('modules.option',['option'=>5])
        @each('modules.option',[['option'=>time()],['option'=>time()],['option'=>time()]],'option' )
    </div>
    @section('footerScript')
        <footer>default</footer>
    @show
</body>
</html>