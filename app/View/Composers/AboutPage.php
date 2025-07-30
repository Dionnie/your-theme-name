<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class AboutPage extends Composer
{
    protected static $views = ['page-sample']; // Blade file

    public function team_members()
    {
        return get_field('team_members') ?: [];
    }

    
    public function mission()
    {
        return get_field('company_mission');
    }
}
