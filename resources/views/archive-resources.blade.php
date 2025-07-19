@extends('layouts.app')

@section('content')
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-6">Resourcesss</h1>

    @if (have_posts())
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @while(have_posts()) @php the_post() @endphp
          <article class="border p-4 rounded shadow">
            <h2 class="text-xl font-semibold">
              <a href="{{ get_permalink() }}">{{ get_the_title() }}</a>
            </h2>

            <div class="mt-2 text-sm text-gray-600">
              {{ get_the_date() }}
            </div>

            <div class="mt-2 text-gray-800">
              {!! wp_trim_words(get_the_content(), 20) !!}
            </div>

            <a href="{{ get_permalink() }}" class="text-blue-600 hover:underline mt-2 inline-block">Read More</a>
          </article>
        @endwhile
      </div>

      <div class="mt-8">
        {!! get_the_posts_navigation() !!}
      </div>
    @else
      <p>No resources found.</p>
    @endif
  </div>
@endsection
