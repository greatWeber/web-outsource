(function($) {
  $.toast = function(message, options) {
      options = $.extend({}, $.toast.defaults, options);
      var $toast = $('<div class="toast"></div>');
      $toast.text(message);
      $('body').append($toast);

      $toast.css({
          "max-width": '300px',
          "position": "fixed",
          "top": options.top,
          "right": options.right,
          "left": options.left,
          "bottom": options.bottom,
          "margin": options.margin,
          "background-color": options.backgroundColor,
          "color": options.textColor,
          "padding": "10px",
          "border-radius": "5px",
          "line-height":"20px",
          "transform":options.transform,
          "z-index": 9999
      });

      $toast.hide().fadeIn(400);
      setTimeout(function() {
          $toast.fadeOut(400, function() {
              $(this).remove();
          });
      }, options.duration);
  };

  $.toast.defaults = {
      top: '20%',
      right:'180px',
      // right: 0,
      // left: 0,
      // bottom: 0,
      // margin: 'auto',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      // transform:'translateX(-50%)',
      duration: 2000
  };
})(jQuery);