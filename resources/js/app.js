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
    $('ul.primary-navigation .sub-menu.level-1').each(function () {
      const $submenu = $(this);

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
        //    $submenu.removeClass('sub-menu-left-align');
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
        });

      // $submenu.css({ display: 'none' });
    });
  }

  // Run the adjustment once the page is fully loaded
  adjustSubMenuPosition();

  // Recalculate submenu positions when the window is resized
  $(window).on('resize', adjustSubMenuPosition);
});
