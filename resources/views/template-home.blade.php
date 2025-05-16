{{--
  Template Name: Home
--}}

@extends('layouts.app')

@section('content')
    @include('partials.page-header')
    @include('partials.content-page')
@endsection


@section('sidebar')
    @include('sections.sidebar')
@endsection
