@extends('layouts.app-canvas')

@section('content')

    @include('partials.page-header-2')
  <div class="page-container" >
    <h1>{!! get_the_title() !!}</h1>



    <div>
      {!! the_content() !!}
    </div>
  </div>
@endsection