<?php // @ app/controllers/single-event.php
namespace App;
use Sober\Controller\Controller;
class SingleResources extends Controller
{
public function eventStartingLocationAddress()
{
return get_field('event_starting_location_address');
}
public function eventStartingLocationDescription()
{
return get_field('event_starting_location_description');
}
public function eventDuration()
{
return wpautop(get_field('event_duration'));
}
}
