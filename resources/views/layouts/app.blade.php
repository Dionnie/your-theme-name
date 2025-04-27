<!doctype html>
<html @php(language_attributes())>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  @php(do_action('get_header'))
  @php(wp_head())
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.js" integrity="sha512-+k1pnlgt4F1H8L7t3z95o3/KO+o78INEcXTbnoJQ/F2VqDVhWoaiVml/OEHv9HsVgxUaVW+IbiZPUJQfF/YxZw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.14.1/themes/base/jquery-ui.min.css" integrity="sha512-TFee0335YRJoyiqz8hA8KV3P0tXa5CpRBSoM0Wnkn7JoJx1kaq1yXL/rb8YFpWXkMOjRcv5txv+C6UluttluCQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  @vite(['resources/css/app.scss', 'resources/js/app.js'])
</head>

<body @php(body_class())>
  @php(wp_body_open())

  <div id="app">
    <a class="sr-only focus:not-sr-only" href="#main">
      {{ __('Skip to content', 'sage') }}
    </a>

    @include('sections.header')

    <main id="main" class="main">
      @yield('content')
    </main>

    @hasSection('sidebar')
    <aside class="sidebar">
      @yield('sidebar')
    </aside>
    @endif

    @include('sections.footer')
  </div>

  @php(do_action('get_footer'))
  @php(wp_footer())
</body>

</html>