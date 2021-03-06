// Generated by CoffeeScript 1.5.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['views/template_view', 'views/questions_sort_options'], function(TemplateView, SortOptionsView) {
    var QuestionsListView;
    return QuestionsListView = (function(_super) {

      __extends(QuestionsListView, _super);

      function QuestionsListView() {
        QuestionsListView.__super__.constructor.apply(this, arguments);
      }

      QuestionsListView.prototype.template_id = 'questions-index-list';

      QuestionsListView.prototype.events = {
        "click button.delete": "deleteQuestion"
      };

      QuestionsListView.prototype.className = 'questions';

      QuestionsListView.prototype.initialize = function(options) {
        this.state = options.state;
        if (options.sortable) {
          return this.sortOptions = new SortOptionsView({
            list: this
          });
        }
      };

      QuestionsListView.prototype.remove = function() {
        var _ref;
        if ((_ref = this.sortOptions) != null) {
          _ref.remove();
        }
        return QuestionsListView.__super__.remove.call(this);
      };

      QuestionsListView.prototype.render = function() {
        var context, filtered;
        filtered = this.collection.where({
          state: this.state
        });
        context = {
          questions: _.invoke(filtered, "toJSON")
        };
        this.$el.html(this.template(context));
        this.$el.addClass("state-" + this.state);
        if (this.sortOptions && filtered.length) {
          this.$el.prepend(this.sortOptions.render().el);
        }
        return this;
      };

      QuestionsListView.prototype.postRender = function() {
        var $el, el, _i, _len, _ref, _ref1;
        _ref = this.$("li.question");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          $el = $(el);
          $el.addClass("slab-" + ("" + $el.data("counter")).length);
        }
        return (_ref1 = this.sortOptions) != null ? _ref1.postRender() : void 0;
      };

      QuestionsListView.prototype.deleteQuestion = function(event) {
        var id, li,
          _this = this;
        event.preventDefault();
        if (window.confirm("Wirklich l\xf6schen?")) {
          li = $(event.target).closest("li");
          id = li.data("id");
          return li.fadeOut().promise().done(function() {
            _this.collection.get(id).destroy();
            li.remove();
            return _this.postRender();
          });
        }
      };

      return QuestionsListView;

    })(TemplateView);
  });

}).call(this);
