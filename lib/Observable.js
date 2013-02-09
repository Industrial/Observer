var slice = Array.prototype.slice,
  out = typeof exports !== 'undefined' && exports || this;

out.Observable = function(instance) {
  instance.events = {};

  instance.on = function(event, handler) {
    var handlers = this.events[event] = this.events[event] || [];
    handlers.push(handler);
  };

  instance.off = function(event, handler) {
    if (!event) {
      this.events = {};
      return;
    }

    if (!handler) {
      if (typeof this.events[event] !== 'undefined') {
        this.events[event] = [];
      }
      return;
    }

    var handlers = this.events[event];
    if (handlers) {
      for (var i = 0, len = handlers.length; i < len; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i);
        }
      }
    }
  };

  instance.once = function(event, handler) {
    var self = this;
    var handlers = this.events[event] = this.events[event] || [];
    var onceHandler = function() {
      handler();
      self.off(event, onceHandler);
    };

    handlers.push(onceHandler);
  };

  instance.emit = function(event) {
    var args     = slice.call(arguments, 1);
    var handlers = this.events[event];
    if (handlers) {
      for (var i = 0, len = handlers.length; i < len; i++) {
        handlers[i].apply(null, args);
      }
    }
  };

  instance.listeners = function(event) {
    return this.events[event];
  };

  instance.hasListeners = function(event) {
    if (typeof this.events[event] !== 'undefined') {
      return this.events[event].length > 0;
    } else {
      return false;
    }
  };
};
