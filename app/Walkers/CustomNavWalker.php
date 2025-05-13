<?php



namespace App\Walkers;

use Walker_Nav_Menu;

class CustomNavWalker extends Walker_Nav_Menu
{

    function start_lvl(&$output, $depth = 0, $args = array())
    {
        $indent = str_repeat("\t", $depth);
        $level_class = 'level-' . ($depth + 1);
        $output .= "\n$indent<ul class=\"sub-menu $level_class\">\n";
    }

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        // Skip rendering if XFN is "hidden"
        if (!empty($item->xfn) && strtolower($item->xfn) === 'hidden') {
            return;
        }

        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'level-' . $depth;
        $class_names = join(' ', array_filter($classes));

        $has_children = in_array('menu-item-has-children', $classes);
        $current_page = in_array('current-menu-item', $classes);

        $output .= "$indent<li id=\"menu-item-$item->ID\" class=\"$class_names\">";

        // Attributes for <a>
        $atts = array();
        $atts['href'] = !empty($item->url) ? $item->url : '';
        if (!empty($item->xfn)) {
            $atts['rel'] = esc_attr($item->xfn);
        }

        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (!empty($value)) {
                $attributes .= " $attr=\"$value\"";
            }
        }

        // Handle title and description
        $title = apply_filters('the_title', $item->title, $item->ID);
        $description = !empty($item->description)
            ? '<span class="menu-description">' . esc_html($item->description) . '</span>'
            : '';
        $button = '<button class="menu-dropdown-btn" type="button" aria-expanded="false" aria-label="' . esc_attr($title) . ' Sub menu">' .
            '<svg class="menu-item-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512"><path d="M256,294.1l127,-127.1c9.4,-9.4 24.6,-9.4 33.9,0c9.3,9.4 9.3,24.6 0,34l-143.9,144c-9.1,9.1 -23.7,9.3 -33.1,0.7l-144.9,-144.6c-4.7,-4.7 -7,-10.9 -7,-17c0,-6.1 2.3,-12.3 7,-17c9.4,-9.4 24.6,-9.4 33.9,0l127.1,127Z" fill="currentColor"></path></svg>' .
            '</button>';


        if ($this->is_shortcode_only($title)) {
            $output .= do_shortcode($title);
        } else {
            $title = '<span class="menu-title">' . esc_html(apply_filters('the_title', $item->title, $item->ID)) . '</span>';
            $output .= '<a' . $attributes . ($current_page ? ' aria-current="page"' : '') . '>' .
                '<div class="link-content">' . $title . $description . '</div>' .
                ($has_children ? $button : '') . '</a>';
            // $output .= "<a$attributes>"  . $title . $description  . "</a>";
        }
    }

    function end_el(&$output, $item, $depth = 0, $args = array())
    {
        // Also skip closing tag if xfn=hidden (safe fallback)
        if (!empty($item->xfn) && strtolower($item->xfn) === 'hidden') {
            return;
        }

        $output .= "</li>\n";
    }

    function end_lvl(&$output, $depth = 0, $args = array())
    {
        $output .= str_repeat("\t", $depth) . "</ul>\n";
    }

    protected function is_shortcode_only($content)
    {
        $content = trim($content);
        return preg_match('/^\[[^\]]+\]$/', $content);
    }
}
