// Generated by CoffeeScript 1.5.0
(function() {

  define(['jqm', 'pusher', 'models/poll_collection', 'models/back_pusher', 'routers/poll'], function(jqm, Pusher, PollCollection, BackPusher, PollRouter) {
    var PollApp;
    return PollApp = (function() {
      var pusherPromise;

      function PollApp() {}

      PollApp.prototype.initialize = function() {
        this.prepopulatePolls();
        this.initRouter();
        this.connectPusher();
        return Backbone.history.start();
      };

      /*
      As the webpage contains the initial polls, pre-populate the global
      $Polls (the initial $ indicates a global variable) with these. This
      way we spare us an initial AJAX call.
      */


      PollApp.prototype.prepopulatePolls = function() {
        return cliqr.$Polls = new PollCollection(cliqr.bootstrap.POLLS || []);
      };

      /*
      Declare the global $App object (the initial $ indicates a global
      variable). We need it to dynamically navigate between routes etc.
      */


      PollApp.prototype.initRouter = function() {
        return cliqr.$App = new PollRouter();
      };

      pusherPromise = function(pusher) {
        var deferred;
        deferred = $.Deferred();
        pusher.connection.bind("connected", function() {
          return deferred.resolve(pusher);
        });
        if (pusher.connection.state === "connected") {
          deferred.resolve(pusher);
        }
        return deferred.promise();
      };

      /*
      connect it to Pusher
      */


      PollApp.prototype.connectPusher = function() {
        var bp, channel, pusher;
        if (!cliqr.$App.pusherEnabled()) {
          return;
        }
        if (cliqr.config.PUSHER_HOST != null) {
          Pusher.host = cliqr.config.PUSHER_HOST;
        }
        if (cliqr.config.PUSHER_PORT != null) {
          Pusher.ws_port = Pusher.wss_port = cliqr.config.PUSHER_PORT;
        }
        pusher = new Pusher(cliqr.config.PUSHER_APP_KEY);
        pusherPromise(pusher).then(function() {
          return Backbone.trigger("pusher_connected");
        });
        channel = pusher.subscribe(cliqr.config.PUSHER_CHANNEL);
        bp = new BackPusher(channel);
        return bp.pushTo(cliqr.$Polls);
      };

      return PollApp;

    })();
  });

}).call(this);
