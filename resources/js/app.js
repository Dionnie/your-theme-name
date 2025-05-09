import.meta.glob(['../images/**', '../fonts/**']);
import 'bootstrap';

jQuery(document).ready(function ($) {
  const PADDING = 20; // Minimum distance from the edge of the screen

  /**
   * Checks whether a given element is overflowing off the left or right side of the viewport.
   * @param {jQuery} $element - The jQuery-wrapped element to check.
   * @param {number} padding - Optional padding to maintain from edges.
   * @returns {Object} - Information about overflow and element offset.
   */
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

  /**
   * Adjusts the position of each submenu inside `.primary-navigation` to prevent it
   * from overflowing off the viewport. Moves it left or adds padding as needed.
   */

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
    const isTablet = window.innerWidth >= 1024;

    if (isTablet) {
      $('ul.primary-navigation').addClass('expanded');
      $('ul.primary-navigation').removeClass('collapsed');
    } else {
      $('ul.primary-navigation').removeClass('expanded');
      $('ul.primary-navigation').addClass('collapsed');
    }
  };
  let resizeTimer;
  runTabletScripts();
  adjustSubMenuPosition();
  adjustCarettPosition();

  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      runTabletScripts();
      adjustSubMenuPosition();
      adjustCarettPosition();
    }, 0); // Delay in milliseconds
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

  applyAnimateHover('.site-logo', 'tada');

  var $hamburger = $('.hamburger');
  $hamburger.on('click', function (e) {
    $hamburger.toggleClass('is-active');
    // Do something else, like open/close menu
  });
});
