// Generated by CoffeeScript 1.5.0
(function() {

  define(['handlebars', 'underscore'], function(Handlebars, _) {
    var currentView;
    currentView = false;
    return {
      changeToPage: function(view) {
        var container;
        if (currentView) {
          currentView.$el.hide();
          currentView.remove();
        }
        currentView = view;
        $(window).scrollTop(0);
        container = $("#layout_container");
        container.prepend(view.render().$el);
        return typeof view.postRender === "function" ? view.postRender() : void 0;
      },
      compileTemplate: _.memoize(function(name) {
        return Handlebars.compile($("#cliqr-template-" + name).html());
      })
    };
  });

}).call(this);
