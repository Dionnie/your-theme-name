import.meta.glob(['../images/**', '../fonts/**']);
import 'bootstrap';
import 'jquery-hoverintent';

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
    $('style[data-submenu-style]').remove();
    $('ul.primary-navigation .sub-menu.level-1').each(function () {
      const $submenu = $(this);
      const $submenuParent = $submenu.parent('li.menu-item-has-children');

      // Reset position to default before recalculating
      $submenu.css({ left: '', right: '' });
      $submenu.removeClass('sub-menu-left-align');

      $submenu.css({ display: 'block' });
      //  const $submenuParent = $(this).closest('.sub-menu.level-1');

      const { overflowRight, overflowLeft, offset, width } =
        isElementOverflowing($submenu);

      // If submenu overflows off the right edge of the screen
      if (overflowRight) {
        const shiftLeft = offset.left + width + PADDING - $(window).width();

        //  $submenuParent.addClass('sub-menu-left-align');

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
        // $submenu.removeClass('sub-menu-left-align');
      }

      /*$(this).find('.sub-menu.level-2::before').css({
        position: absolute,
        content: '',
        bottom: '100%',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '15px solid grey',
      });*/

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
        });

      // $submenu.css({ display: 'none' });

      // Calculate the center X of the parent relative to the submenu
      const parentOffset = $submenuParent.offset().left;
      const submenuOffset = $submenu.offset().left;
      const parentWidth = $submenuParent.outerWidth();

      const centerX = parentOffset - submenuOffset + parentWidth / 2;

      const submenuId = $submenuParent.attr('id');

      const style = `
        <style data-submenu-style>
          li#${submenuId} .sub-menu.level-1::before {
            position: absolute;
            content: '';
            bottom: 100%;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 12px solid white;
            left: ${centerX - 18}px;
            z-index:2;
           
          }

          li#${submenuId} .sub-menu.level-1::after {
            position: absolute;
            content: '';
            bottom: 100%;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            border-bottom: 16px solid rgba(0,0,0, 0.02);
            z-index:1;
            left: ${centerX - 22}px;
         
          }


        
        </style>
      `;
      $('head').append(style);
    });
  }

  // Run the adjustment once the page is fully loaded
  adjustSubMenuPosition();

  // Recalculate submenu positions when the window is resized
  $(window).on('resize', adjustSubMenuPosition);

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

  function applyHoverIntentAnimation(
    parentSelector,
    childSelector,
    animationName
  ) {
    $(parentSelector).hoverIntent({
      over: function () {
        const target = $(this).find(childSelector);
        target.removeClass(`animate__animated animate__${animationName}`);
        void target[0].offsetWidth; // Force reflow
        target.addClass(`animate__animated animate__${animationName}`);
      },
      out: function () {
        const target = $(this).find(childSelector);
        target.one(
          'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
          function () {
            target.removeClass(`animate__animated animate__${animationName}`);
          }
        );
      },
      timeout: 150, // Adjust as needed (ms delay before `out`)
    });
  }

  applyAnimateHover('.site-logo', 'tada');

  /*   applyHoverIntentAnimation(
    'li.menu-item.menu-item-has-children',
    'ul.sub-menu',
    'slideInUp animate__faster'
  ); */
});
