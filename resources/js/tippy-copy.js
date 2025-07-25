export function adjustSubMenu() {
  var PADDING = 20;
  jQuery(document).ready(function ($) {
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

        const $submenuParent = $(this)
          .parent('.sub-menu-wrapper')
          .parent('.menu-item');
        const isMegaMenu = $submenuParent.hasClass('mega-menu');

        /*      if (isMegaMenu == true) {
        PADDING = 0;
      }
 */
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
            $submenu.css({
              left: (parseInt($submenu.css('left')) || 0) - shiftLeft + 'px',
              right: PADDING + 'px',
            });
          } else {
            // Otherwise, align it with minimum padding from the left
            //  $submenu.css({ left: PADDING + 'px', right: PADDING + 'px' });
          }
        }
        // If submenu overflows off the left edge
        else if (overflowLeft) {
          // $submenu.css({ left: PADDING + 'px', right: PADDING + 'px' });
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
        PADDING = 20;
      });
    }

    adjustSubMenuPosition();

    $('ul.primary-navigation.collapsed')
      .find('.current_page_ancestor')
      .toggleClass('toggled-on');

    $(window).on('resize', function () {
      adjustSubMenuPosition();
    });
  });
}
