(function() {

  define(['backbone', 'underscore'], function(Backbone, _) {
    /*
      TODO
    */

    var BackPusher;
    return BackPusher = (function() {

      function BackPusher(channel) {
        this.channel = channel;
      }

      BackPusher.prototype.events = {
        started: "add",
        stopped: "remove"
      };

      BackPusher.prototype.pushTo = function(collection) {
        var event, method, _ref, _results;
        _ref = this.events;
        _results = [];
        for (event in _ref) {
          method = _ref[event];
          _results.push(this.channel.bind(event, _.bind(this[method], this, collection)));
        }
        return _results;
      };

      BackPusher.prototype.add = function(collection, question) {
        return collection.add(question, {
          merge: true
        });
      };

      BackPusher.prototype.remove = function(collection, id) {
        var model;
        if (model = collection.get(id)) {
          return collection.remove(model);
        }
      };

      return BackPusher;

    })();
  });

}).call(this);
