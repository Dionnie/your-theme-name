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


        if ($this->is_shortcode_only($title)) {
            $output .= do_shortcode($title);
        } else {
            $title = '<span class="menu-title">' . esc_html(apply_filters('the_title', $item->title, $item->ID)) . '</span>';
            $output .= "<a$attributes>" . $title . $description . "</a>";
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
