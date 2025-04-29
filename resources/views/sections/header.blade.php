<?php

use App\Walkers\CustomNavWalker;

?>


<header class="banner">


  <div class="top-message">
    <span>
      +88 123 456 789

    </span>
    <span>

      info@example.com

    </span>
    <span>

      Mon - Fri : 09:00 - 18:00
    </span>
  </div>
  @if (has_nav_menu('primary_navigation'))
  <nav
    aria-label="{{ wp_get_nav_menu_name('primary_navigation') }}">
    <div class="shadow-dummy"></div>
    <div class="container">

      <a href="<?php echo  home_url() ?>" class="site-logo">
        <?php
        $custom_logo_id = get_theme_mod('custom_logo');
        $logo = wp_get_attachment_image_src($custom_logo_id, 'full');
        if (has_custom_logo()) {
          echo '<img width="200px" src="' . esc_url($logo[0]) . '" alt="' . get_bloginfo('name') . '">';
        } else {
          echo '<h1 class="site-name">' . get_bloginfo('name') . '</h1>';
        }
        ?>
      </a>



      @if (has_nav_menu('primary_navigation')) {!!

      wp_nav_menu([
      'theme_location' => 'primary_navigation',
      'menu_class' => 'primary-navigation ',

      'container' => false,
      ])

      !!} @endif


      <!--      @if (has_nav_menu('primary_navigation'))
        {!! wp_nav_menu($primarymenu()) !!}
        @endif -->
    </div>
  </nav>
  @endif




</header>