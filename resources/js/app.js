import.meta.glob(['../images/**', '../fonts/**']);
import 'bootstrap';

import { animateHover } from './animate-hover.js';
import { adjustSubMenu } from './tippy.js';
import { adjustCaret } from './caret.js';

jQuery(document).ready(function ($) {
  adjustSubMenu();
  adjustCaret();

  $('.primary-navigation-hamburger').click(function () {
    $(this).toggleClass('open');
  });

  $('.menu-dropdown-btn').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    $('.menu-dropdown-btn')
      .not(this)
      .each(function () {
        $(this).closest('.menu-item').removeClass('toggled-on');
      });

    $(this).closest('.menu-item').parents('li').addClass('toggled-on');
    $(this).closest('.menu-item').toggleClass('toggled-on');
  });

  const runTabletScripts = () => {
    const isTablet = window.innerWidth >= 1180;

    if (isTablet) {
      $('.primary-navigation-hamburger').removeClass('is-active');

      $('ul.primary-navigation.collapsed').addClass('hidden');
    } else {
      $('ul.primary-navigation.expanded li.menu-item').each(function () {
        $(this).removeClass('toggled-on');
      });
    }
  };
  let resizeTimer;
  runTabletScripts();

  $('ul.primary-navigation.collapsed')
    .find('.current_page_ancestor')
    .toggleClass('toggled-on');

  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      runTabletScripts();
    }, 0);
  });

  animateHover('.site-logo', 'tada');

  const $hamburger = $('.primary-navigation-hamburger');
  $hamburger.on('click', function (e) {
    $hamburger.toggleClass('is-active');
    $('ul.primary-navigation.collapsed').toggleClass('hidden');
  });
});
