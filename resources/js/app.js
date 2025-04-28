import.meta.glob(['../images/**', '../fonts/**']);
import 'bootstrap';

jQuery(document).ready(function ($) {
  function adjustSubMenuPosition() {
    $('.sub-menu').each(function () {
      const $submenu = $(this);
      const offset = $submenu.offset();
      const width = $submenu.outerWidth();
      const windowWidth = $(window).width();
      const padding = 20; // 20px padding from edges

      // Reset position first
      $submenu.css({ left: '', right: '' });

      const newOffset = $submenu.offset(); // get fresh after reset
      const overflowRight = newOffset.left + width + padding - windowWidth;
      const overflowLeft = newOffset.left - padding;

      if (overflowRight > 0) {
        const shiftLeft = overflowRight;
        if (newOffset.left - shiftLeft >= padding) {
          $submenu.css(
            'left',
            parseInt($submenu.css('left') || 0) - shiftLeft + 'px'
          );
        } else {
          $submenu.css('left', padding + 'px');
        }
      } else if (overflowLeft < 0) {
        $submenu.css('left', padding + 'px');
      }
    });
  }

  // Run on page load
  adjustSubMenuPosition();

  // Run on window resize (with small delay for stability)
  $(window).on('resize', function () {
    adjustSubMenuPosition();
  });
});
