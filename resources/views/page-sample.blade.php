@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
  <div class="page-container">
       <h2>Mission</h2>
    <p>{{ $mission }}</p>
      @includeFirst(['partials.content-page', 'partials.content'])
  </div>
  @endwhile
@endsection
