@extends('layouts.app-canvas')

@section('content')

    @include('partials.page-header-2')
  <div class="container" style="margin: 0 auto; max-width: 1024px" >
    <h1>{!! get_the_title() !!}</h1>

    <div class="content">
      {!! the_content() !!}
    </div>
  </div>
@endsection