export function adjustSubMenu() {
  jQuery(document).ready(function ($) {
    function debounce(func, delay) {
      let timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
      };
    }

    function isElementOverflowing($element, padding = 20) {
      const offset = $element.offset(); // Distance from top-left of the page
      const width = $element.outerWidth(); // Full width including padding/border
      const windowWidth = $(window).width(); // Viewport width

      const overflowRight = offset.left + width + padding > windowWidth;
      const overflowLeft = offset.left - padding < 0;

      return overflowLeft || overflowRight;
    }

    function adjustSubMenuPosition() {
      $('ul.primary-navigation.expanded .sub-menu.level-1').each(function () {
        const $submenu = $(this);
        let $lastSubMenu = $(this).find('.sub-menu').last();

        $lastSubMenu = $lastSubMenu.length ? $lastSubMenu.last() : $submenu;
        console.log('Sub Menu ' + $submenu.className);
        console.log('Last Sub Menu ' + $lastSubMenu.className);
        $submenu.css({ display: 'block' });
        $lastSubMenu.css({ display: 'block' });
        const $submenuParent = $(this)
          .parent('.sub-menu-wrapper')
          .parent('.menu-item');

        if (isElementOverflowing($lastSubMenu)) {
          console.log('laspas');
          $submenuParent.addClass('sub-menu-left-align');
        } else {
          $submenuParent.removeClass('sub-menu-left-align');
          if (isElementOverflowing($lastSubMenu)) {
            console.log('laspas');
            $submenuParent.addClass('sub-menu-left-align');
          }
        }
      });
    }

    adjustSubMenuPosition();

    $(window).on('resize', debounce(adjustSubMenuPosition, 150));
  });
}
