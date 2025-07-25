export function adjustCaret() {
  jQuery(document).ready(function ($) {
    function adjustCarettPosition() {
      $('style[data-submenu-style]').remove();
      $('ul.primary-navigation.expanded  .sub-menu.level-1').each(function () {
        const $submenu = $(this);
        const $submenuParent = $submenu.closest('li.menu-item-has-children');

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

    adjustCarettPosition();

    $(window).on('resize', function () {
      adjustCarettPosition();
    });
  });
}
