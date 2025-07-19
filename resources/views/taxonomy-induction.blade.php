@extends('layouts.app')



@section('content')

    @include('partials.page-header')

  @php($term = get_queried_object())

  <section class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-2">{{ $term->name }}</h1>

    @if($term->description)
      <p class="text-gray-600 mb-6">{!! nl2br($term->description) !!}</p>
    @endif

    @if (have_posts())
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @while(have_posts()) @php(the_post())
          <article class="bg-white shadow rounded-xl p-4">
            <h2 class="text-xl font-semibold mb-2">
              <a href="{{ get_permalink() }}" class="text-blue-600 hover:underline">
                {{ get_the_title() }}
              </a>
            </h2>
            @if(has_post_thumbnail())
              <div class="mb-3">
                <a href="{{ get_permalink() }}">
                  {!! get_the_post_thumbnail(null, 'medium', ['class' => 'rounded-md']) !!}
                </a>
              </div>
            @endif
            <div class="text-sm text-gray-500">
              {!! get_the_excerpt() !!}
            </div>
          </article>
        @endwhile
      </div>

      <div class="mt-8">
        {!! get_the_posts_navigation([
          'prev_text' => '&laquo; Previous',
          'next_text' => 'Next &raquo;',
        ]) !!}
      </div>
    @else
      <p class="text-gray-500">No content found for this induction type.</p>
    @endif
  </section>
@endsection
