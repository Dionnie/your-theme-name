@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
  <div class="page-container">
      <h1>About Us</h1>
    <p>Welcome to [Your Company Name]!</p>
    <p>
      We are a passionate team dedicated to delivering quality and value in everything we do.
      Our mission is to provide reliable solutions tailored to your needs.
    </p>
    <p>
      Thank you for visiting us. Whether you're a new customer or have been with us for a while,
      we’re here to help you every step of the way.
    </p>
  </div>
  @endwhile
@endsection
