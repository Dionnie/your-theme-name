<?php

namespace App\Walkers;

use Walker_Nav_Menu;

class CustomNavWalker extends Walker_Nav_Menu
{
    public function start_lvl(&$output, $depth = 0, $args = null)
    {
        // Start UL tag with a placeholder — we'll replace it if a shortcode is found in children
        $output .= "<ul class=\"sub-menu\">";
    }

    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
    {
        // Basic item rendering
        $title = $item->title;



        $output .= '<li><a href="' . esc_url($item->url) . '">' . esc_html($title) . '</a></li>';
    }
}
