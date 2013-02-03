var Observable, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
out$.Observable = Observable = {
  events: {},
  on: function(e, fn){
    var ref$;
    return ((ref$ = this.events)[e] || (ref$[e] = [])).push(fn);
  },
  once: function(e, fn){
    var ref$, this$ = this;
    return ((ref$ = this.events)[e] || (ref$[e] = [])).push(function(){
      this$.off(e, fn);
      return fn();
    });
  },
  off: function(e, fn){
    var ref$;
    switch (false) {
    case !(e && fn):
      return (ref$ = this.events)[e] = ref$[e].filter((function(it){
        return it !== fn;
      }));
    case !e:
      return this.events[e] = {};
    default:
      return this.events = {};
    }
  },
  emit: function(e){
    var args;
    args = slice$.call(arguments, 1);
    if (this.events[e]) {
      return each(function(x){
        return typeof x === 'function' ? x.apply(null, args) : void 8;
      }, this.events[e]);
    }
  },
  listeners: function(e){
    return this.events[e] || [];
  },
  hasListeners: function(e){
    return this.events[e].length > 0;
  }
};