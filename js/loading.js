(function($) {
  $.loading = function(options) {
      options = $.extend({}, $.loading.defaults, options);
      var $loading = $('<div class="jq-loading"></div>');
      var $icon = $('<i class="iconfont icon-load"></i>');
      if($('.jq-loading').length) {
        $loading.fadeIn(400);
      };
      $loading.append($icon);
      $('body').append($loading);

      $loading.css({
          "position": "fixed",
          "top": 0,
          "left": 0,
          "width": "100%",
          "height": "100%",
          "background-color": options.backgroundColor,
          "color": options.textColor,
          "display": "flex",
          "justify-content": "center",
          "align-items": "center",
          "z-index": 9999
      });

      $icon.css({
          "font-size": options.iconSize
      });

      $.loading.show = function() {
          $loading.fadeIn(400);
      };

      $.loading.hide = function() {
          $loading.fadeOut(400);
      };
      return $loading;
  };

  $.loading.defaults = {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      textColor: '#999',
      iconSize: '60px'
  };
})(jQuery);