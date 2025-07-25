<?php

/**
 * Theme setup.
 */

namespace App;

use Illuminate\Support\Facades\Vite;



/**
 * Inject styles into the block editor.
 *
 * @return array
 */
add_filter('block_editor_settings_all', function ($settings) {
    $style = Vite::asset('resources/css/editor.scss');

    $settings['styles'][] = [
        'css' => "@import url('{$style}')",
    ];

    return $settings;
});

/**
 * Inject scripts into the block editor.
 *
 * @return void
 */
add_filter('admin_head', function () {
    if (! get_current_screen()?->is_block_editor()) {
        return;
    }

    $dependencies = json_decode(Vite::content('editor.deps.json'));

    foreach ($dependencies as $dependency) {
        if (! wp_script_is($dependency)) {
            wp_enqueue_script($dependency);
        }
    }

    echo Vite::withEntryPoints([
        'resources/js/editor.js',
    ])->toHtml();
});

/**
 * Use the generated theme.json file.
 *
 * @return string
 */
add_filter('theme_file_path', function ($path, $file) {
    return $file === 'theme.json'
        ? public_path('build/assets/theme.json')
        : $path;
}, 10, 2);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    /**
     * Disable full-site editing support.
     *
     * @link https://wptavern.com/gutenberg-10-5-embeds-pdfs-adds-verse-block-color-options-and-introduces-new-patterns
     */
    remove_theme_support('block-templates');

    /**
     * Register the navigation menus.
     *
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
    ]);

    /**
     * Disable the default block patterns.
     *
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

    /**
     * Enable plugins to manage the document title.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embed support.
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);

    /**
     * Enable selective refresh for widgets in customizer.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#customize-selective-refresh-widgets
     */
    add_theme_support('customize-selective-refresh-widgets');
}, 20);

/**
 * Register the theme sidebars.
 *
 * @return void
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
    ];
    register_sidebar([
        'name' => __('Primary', 'sage'),
        'id' => 'sidebar-primary',
    ] + $config);

    register_sidebar([
        'name' => __('Footer', 'sage'),
        'id' => 'sidebar-footer',
    ] + $config);


      register_sidebar([
        'name' => __('Mega Menu', 'sage'),
        'id' => 'mega-menu',
    ] + $config);

    

    




});


// Add support for custom logo
add_action('after_setup_theme',  function () {
    $defaults = array(
        'height'               => 27,
        'width'                => 163,
        'flex-height'          => true,
        'flex-width'           => true,
        'header-text'          => array('site-title', 'site-description'),
        'unlink-homepage-logo' => true,
    );
    add_theme_support('custom-logo', $defaults);
});


// Add SVG support to WordPress
/* add_filter('upload_mimes', function () {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
});

 */




// Add a custom walker to the primary navigation, shortcode rendering
add_filter('walker_nav_menu_start_el', function ($item_output, $item, $depth, $args) {
    if (preg_match('/^\[.*\]$/', $item->title)) {
        $shortcode_output = do_shortcode($item->title);
        return  $shortcode_output;
    }
    return $item_output;
}, 10, 4);



/* Add the shortcode and allow positioning in page*/     

  


add_shortcode('add_sidebar', function ($atts) {
    ob_start();
?>

<?php dynamic_sidebar( 'mega-menu' ); ?>


<?php
    return ob_get_clean();
});


add_shortcode('mega_menu', function ($atts) {
    ob_start();
?>


    <div class="mega-menuu" style="min-width: 720px;padding:20px;background-color:white">
        <div class="menu-content">
            <div class="column">
                <h4>Category 1</h4>
                <h1 class="animate__animated animate__bounce">An animated element An animated element An animated element</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis inventore repellendus aliquam et consequuntur eaque quasi ipsum corrupti ducimus earum magnam qui, possimus dignissimos nulla atque minima optio. Beatae, temporibus!</p>
            </div>
            <!-- Add more columns if needed -->
        </div>
    </div>



<?php
    return ob_get_clean();
});



