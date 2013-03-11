// Generated by CoffeeScript 1.5.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['views/template_view'], function(TemplateView) {
    var SortOptionsView;
    return SortOptionsView = (function(_super) {

      __extends(SortOptionsView, _super);

      function SortOptionsView() {
        this.sortBy = __bind(this.sortBy, this);
        SortOptionsView.__super__.constructor.apply(this, arguments);
      }

      SortOptionsView.prototype.template_id = 'questions-sort-options';

      SortOptionsView.prototype.events = {
        "click .sort-by li": "sortBy"
      };

      SortOptionsView.prototype.initialize = function(options) {
        return this.list = options.list;
      };

      SortOptionsView.prototype.remove = function() {
        this.getList().isotope('destroy');
        return SortOptionsView.__super__.remove.call(this);
      };

      SortOptionsView.prototype.getList = function() {
        return this.list.$('ol').first();
      };

      SortOptionsView.prototype.render = function() {
        this.$el.html(this.template());
        return this;
      };

      SortOptionsView.prototype.postRender = function() {
        var list;
        list = this.getList();
        if (!list.data("isotope")) {
          return list.isotope({
            animationEngine: 'jquery',
            itemSelector: 'li',
            getSortData: {
              question: function(elem) {
                return elem.attr('data-question').toLocaleLowerCase();
              },
              counter: function(elem) {
                return -parseInt(elem.attr('data-counter'), 10);
              },
              startdate: function(elem) {
                return parseInt(elem.attr('data-startdate'), 10);
              }
            }
          });
        } else {
          return list.isotope("reloadItems").isotope("reLayout");
        }
      };

      SortOptionsView.prototype.sortBy = function(event) {
        var target;
        target = $(event.target);
        if (target.hasClass("selected")) {
          target.toggleClass("reversed");
        } else {
          this.$(".sort-by .selected").removeClass("selected reversed");
          target.addClass("selected");
        }
        return this.getList().isotope({
          sortBy: target.attr("data-attribute"),
          sortAscending: !target.hasClass("reversed")
        });
      };

      return SortOptionsView;

    })(TemplateView);
  });

}).call(this);
