// Generated by CoffeeScript 1.4.0
(function() {

  define(['utils', 'models/question', 'models/questions', 'views/questions_index', 'views/questions_show', 'routers/questions'], function(utils, Question, QuestionCollection, QuestionsIndexView, QuestionView, QuestionsRouter) {
    var QuestionsApp;
    return QuestionsApp = (function() {

      function QuestionsApp() {}

      QuestionsApp.prototype.initialize = function() {
        this.initStuff();
        this.initRouters();
        return Backbone.history.start();
      };

      QuestionsApp.prototype.initStuff = function() {
        return setTimeout((function() {
          return $(".self-destroy").remove();
        }), 5000);
      };

      QuestionsApp.prototype.initRouters = function() {
        var router;
        return router = new QuestionsRouter;
      };

      return QuestionsApp;

    })();
  });

}).call(this);
