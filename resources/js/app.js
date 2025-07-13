import.meta.glob(['../images/**', '../fonts/**']);
import 'bootstrap';

jQuery(document).ready(function ($) {
  $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
    $(this).toggleClass('open');
  });

  function applyAnimateHover(selector, animationName) {
    $(document).on('mouseenter', selector, function () {
      const el = $(this);
      el.removeClass(`animate__animated animate__${animationName}`);
      void el[0].offsetWidth; // Reflow
      el.addClass(`animate__animated animate__${animationName}`);
    });

    $(document).on('mouseleave', selector, function () {
      const el = $(this);
      el.one(
        'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
        function () {
          el.removeClass(`animate__animated animate__${animationName}`);
        }
      );
    });
  }

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

  const PADDING = 20;

  function isElementOverflowing($element, padding = PADDING) {
    const offset = $element.offset(); // Distance from top-left of the page
    const width = $element.outerWidth(); // Full width including padding/border
    const windowWidth = $(window).width(); // Viewport width
    return {
      overflowRight: offset.left + width + padding > windowWidth,
      overflowLeft: offset.left - padding < 0,
      offset,
      width,
    };
  }

  function adjustSubMenuPosition() {
    $('ul.primary-navigation.expanded .sub-menu.level-1').each(function () {
      const $submenu = $(this);

      // Reset position to default before recalculating
      $submenu.css({ left: '', right: '', top: '', bottom: '' });
      $submenu.removeClass('sub-menu-left-align');
      $submenu.css({ display: 'block' });

      const { overflowRight, overflowLeft, offset, width } =
        isElementOverflowing($submenu);

      // If submenu overflows off the right edge of the screen
      if (overflowRight) {
        const shiftLeft = offset.left + width + PADDING - $(window).width();

        // If shifting left won't push it off the left edge
        if (offset.left - shiftLeft >= PADDING) {
          $submenu.css(
            'left',
            (parseInt($submenu.css('left')) || 0) - shiftLeft + 'px'
          );
        } else {
          // Otherwise, align it with minimum padding from the left
          $submenu.css('left', PADDING + 'px');
        }
      }
      // If submenu overflows off the left edge
      else if (overflowLeft) {
        $submenu.css('left', PADDING + 'px');
      } else {
      }

      $(this)
        .find('.sub-menu.level-2')
        .each(function () {
          const $submenu = $(this);
          $submenu.css({ display: 'block' });

          const $submenuParent = $(this).closest('.sub-menu.level-1');

          const { overflowRight, overflowLeft, offset, width } =
            isElementOverflowing($submenu);

          // If submenu overflows off the right edge of the screen
          if (overflowRight) {
            $submenuParent.toggleClass('sub-menu-left-align');
          }

          $submenu.css({ display: '' });
        });

      $submenu.css({ display: '' });
    });
  }

  function adjustCarettPosition() {
    $('style[data-submenu-style]').remove();
    $('ul.primary-navigation.expanded .sub-menu.level-1').each(function () {
      const $submenu = $(this);
      const $submenuParent = $submenu.parent('li.menu-item-has-children');
      $submenu.css({ display: 'block' });
      // Calculate the center X of the parent relative to the submenu
      const parentOffset = $submenuParent.offset().left;
      const submenuOffset = $submenu.offset().left;
      const parentWidth = $submenuParent.outerWidth();
      const submenuWidth = $submenu.outerWidth();

      let centerX = parentOffset - submenuOffset + parentWidth / 2;

      // Limit caret to within submenu width
      const caretPadding = 30; // max caret distance from edge (matches your -22px)
      const carettOffset = 10;

      centerX = Math.max(
        caretPadding,
        Math.min(centerX, submenuWidth - caretPadding)
      );

      const submenuId = $submenuParent.attr('id');

      const style = `
        <style data-submenu-style>
        ul.primary-navigation.expanded li#${submenuId} .sub-menu.level-1::before {
            left: ${centerX - carettOffset}px;
          }
          ul.primary-navigation.expanded li#${submenuId} .sub-menu.level-1::after {
            left: ${centerX - carettOffset - 2}px;
          }
        </style>
      `;
      $('head').append(style);
      $submenu.css({ display: '' });
    });
  }

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

    /*    if (isTablet) {
      $('ul.primary-navigation').addClass('expanded');
      $('ul.primary-navigation').removeClass('collapsed');
      $('ul.primary-navigation').show();
      $('.primary-navigation-hamburger').hide();
      $('.primary-navigation-hamburger').removeClass('is-active');
    } else {
      $('ul.primary-navigation').removeClass('expanded');
      $('ul.primary-navigation').addClass('collapsed');
      $('ul.primary-navigation').hide();
      $('.primary-navigation-hamburger').show();
    } */
  };
  let resizeTimer;
  runTabletScripts();
  adjustSubMenuPosition();
  adjustCarettPosition();

  $('ul.primary-navigation.collapsed')
    .find('.current_page_ancestor')
    .toggleClass('toggled-on');

  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      runTabletScripts();
      adjustSubMenuPosition();
      adjustCarettPosition();
    }, 0);
  });

  applyAnimateHover('.site-logo', 'tada');

  var $hamburger = $('.primary-navigation-hamburger');
  $hamburger.on('click', function (e) {
    $hamburger.toggleClass('is-active');
    $('ul.primary-navigation.collapsed').toggleClass('hidden');
  });
});
