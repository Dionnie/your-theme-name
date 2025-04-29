<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

use App\Walkers\CustomNavWalker;

class App extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        '*',
    ];

    /**
     * Retrieve the site name.
     */
    public function siteName(): string
    {
        return get_bloginfo('name', 'display');
    }

    public function primarymenu()
    {
        $args = array(
            'theme_location' => 'primary_navigationx',
            'menu_class' => 'navbar-nav me-auto mb-2 mb-lg-0',
            'container' => false,
            //  'walker' => new CustomNavWalker(),
            'depth' => 3,

        );
        return $args;
    }
}
