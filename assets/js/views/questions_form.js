// Generated by CoffeeScript 1.5.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'utils', 'handlebars', 'views/template_view'], function(Backbone, utils, Handlebars, TemplateView) {
    var QuestionsForm;
    return QuestionsForm = (function(_super) {
      var disableSaveButton;

      __extends(QuestionsForm, _super);

      function QuestionsForm() {
        QuestionsForm.__super__.constructor.apply(this, arguments);
      }

      QuestionsForm.prototype.template_id = 'questions-form';

      QuestionsForm.prototype.className = 'questions-form';

      QuestionsForm.prototype.events = {
        "click .choice-new": "addChoice",
        "click .close": "removeChoice",
        "keydown input.choice": "enhanceChoiceInput",
        "submit form": "submitForm"
      };

      QuestionsForm.prototype.initialize = function() {
        if (!Handlebars.partials['choice']) {
          return Handlebars.registerPartial('choice', utils.compileTemplate('questions-choice'));
        }
      };

      QuestionsForm.prototype.render = function() {
        this.$el.html(this.template(this.model ? this.model.toJSON() : {}));
        this.$("form").validator();
        return this;
      };

      QuestionsForm.prototype.addChoice = function(event) {
        var choice;
        choice = Handlebars.partials['choice']({});
        return $(choice).insertBefore(this.$('.choice-new')).find("input").focus();
      };

      QuestionsForm.prototype.removeChoice = function(event) {
        var choice_input;
        choice_input = $(event.target).closest(".choice-input");
        if (choice_input.siblings(".choice-input").length) {
          return choice_input.remove();
        } else {
          return choice_input.effect("shake", 50);
        }
      };

      QuestionsForm.prototype.enhanceChoiceInput = function(event) {
        var form_inputs, index, inputs, last;
        if (event.which === 13 || event.which === 38 || event.which === 40) {
          inputs = this.$(".choices input");
          last = inputs.length - 1;
          index = inputs.index(event.target);
          if (event.which === 13 || event.which === 40) {
            if (last === index) {
              this.addChoice();
            } else {
              inputs[index + 1].focus();
            }
            event.preventDefault();
          }
          if (event.which === 38) {
            form_inputs = this.$(".choices input");
            index = Math.max(0, form_inputs.index(event.target) - 1);
            form_inputs.eq(index).focus();
            return event.preventDefault();
          }
        }
      };

      disableSaveButton = function() {
        var button;
        button = this.$("button[name=save]");
        if (button.length) {
          return button.prop("disabled", true).showAjaxNotification();
        }
      };

      QuestionsForm.prototype.submitForm = function(event) {
        var action, form, url;
        event.preventDefault();
        form = this.$("form");
        if (!form.data("validator").checkValidity()) {
          return;
        }
        disableSaveButton();
        action = "questions/" + (this.model ? "update/" + this.model.id : "create");
        url = "" + cliqr.config.PLUGIN_URL + action + "?cid=" + cliqr.config.CID;
        return $.post(url, form.serialize()).done(function(msg) {
          return Backbone.history.navigate("show-" + msg.id, {
            trigger: true
          });
        }).fail(function() {
          return console.log("TODO fail", arguments);
        });
      };

      return QuestionsForm;

    })(TemplateView);
  });

}).call(this);
