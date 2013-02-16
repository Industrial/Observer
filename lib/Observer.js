var slice = [].slice,
  out = typeof exports !== 'undefined' && exports || this,
  Observer;

Observer = out.Observer = function Observer() {
  this.events = {};
};

Observer.prototype.on = function(event, handler) {
  var handlers = this.events[event] = this.events[event] || [];
  handlers.push(handler);
};

Observer.prototype.off = function(event, handler) {
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

Observer.prototype.once = function(event, handler) {
  var self = this;
  var handlers = this.events[event] = this.events[event] || [];
  var onceHandler = function() {
    handler();
    self.off(event, onceHandler);
  };

  handlers.push(onceHandler);
};

Observer.prototype.emit = function(event) {
  var args     = slice.call(arguments, 1);
  var handlers = this.events[event];
  if (handlers) {
    for (var i = 0, len = handlers.length; i < len; i++) {
      handlers[i].apply(null, args);
    }
  }
};

Observer.prototype.getListeners = function(event) {
  return this.events[event];
};

Observer.prototype.hasListeners = function(event) {
  if (typeof this.events[event] !== 'undefined') {
    return this.events[event].length > 0;
  } else {
    return false;
  }
};
