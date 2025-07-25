export function animateHover(selector, animationName) {
  jQuery(document).on('mouseenter', selector, function () {
    const el = jQuery(this);
    el.removeClass(`animate__animated animate__${animationName}`);
    void el[0].offsetWidth; // Reflow
    el.addClass(`animate__animated animate__${animationName}`);
  });

  jQuery(document).on('mouseleave', selector, function () {
    const el = jQuery(this);
    el.one(
      'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
      function () {
        el.removeClass(`animate__animated animate__${animationName}`);
      }
    );
  });
}
