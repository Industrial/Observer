var Observable, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
out$.Observable = Observable = function(o){
  o.events = {};
  o.on = function(e, fn){
    var handlers;
    handlers = this.events[e] = this.events[e] || [];
    handlers.push(fn);
  };
  o.off = function(e, fn){
    var handlers, i$, len$, i, f;
    if (e) {
      if (fn) {
        handlers = this.events[e];
        for (i$ = 0, len$ = handlers.length; i$ < len$; ++i$) {
          i = i$;
          f = handlers[i$];
          if (f === fn) {
            handlers.splice(i);
          }
        }
      } else {
        this.events[e] = [];
      }
    } else {
      this.events = {};
    }
  };
  o.once = function(e, fn){
    var handlers, this$ = this;
    handlers = this.events[e] = this.events[e] || [];
    handlers.push(function(){
      this$.off(e, fn);
      return fn();
    });
  };
  o.emit = function(e){
    var args, handlers, i$, len$, handler;
    args = slice$.call(arguments, 1);
    handlers = this.events[e];
    if (handlers) {
      for (i$ = 0, len$ = handlers.length; i$ < len$; ++i$) {
        handler = handlers[i$];
        handler.apply(null, args);
      }
    }
  };
  o.listeners = function(e){
    return this.events[e] || [];
  };
  o.hasListeners = function(e){
    return this.events[e].length > 0;
  };
};