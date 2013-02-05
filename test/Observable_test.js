var assert, Observable, It;
assert = require('assert');
Observable = require('../lib/Observable').Observable;
It = it;
describe('Observable', function(){
  var Foo;
  Foo = (function(){
    Foo.displayName = 'Foo';
    var prototype = Foo.prototype, constructor = Foo;
    function Foo(){
      Observable(this);
    }
    return Foo;
  }());
  describe('#on', function(){
    return describe('given an event name (String) and an event handler (Function)', function(){
      return It('should contain the handler', function(cb){
        var o, handler;
        o = new Foo;
        handler = function(){};
        o.on('foo', handler);
        assert.equal(o.events.foo[0], handler);
        return cb();
      });
    });
  });
  describe('#off', function(){
    describe('given an event name (String) and an event handler (Function)', function(){
      return It('should remove the handler', function(cb){
        var o, handler;
        o = new Foo;
        handler = function(){};
        o.on('foo', handler);
        o.off('foo', handler);
        assert.equal(o.events.foo.length, 0);
        return cb();
      });
    });
    describe('given an event name (String)', function(){
      return It('should remove all handlers for that event', function(cb){
        var o;
        o = new Foo;
        o.on('foo', function(){});
        o.on('foo', function(){});
        assert.equal(o.events.foo.length, 2);
        o.off('foo');
        assert.equal(o.events.foo.length, 0);
        return cb();
      });
    });
    return describe('given no arguments', function(){
      return It('should remove all handlers for all events', function(cb){
        var o;
        o = new Foo;
        o.on('foo', function(){});
        o.on('baz', function(){});
        assert.equal(o.events.foo.length, 1);
        assert.equal(o.events.baz.length, 1);
        o.off();
        assert.equal(o.events.hasOwnProperty('foo'), false);
        assert.equal(o.events.hasOwnProperty('baz'), false);
        return cb();
      });
    });
  });
  describe('#emit', function(){});
  describe('#listeners', function(){});
  describe('#hasListeners', function(){});
  return describe('#once', function(){
    return describe('given an event name (String) and an event handler (Function)', function(){
      It('should contain the handler', function(cb){
        var o, handler;
        o = new Foo;
        handler = function(){};
        o.on('foo', handler);
        assert.equal(o.events.foo[0], handler);
        return cb();
      });
      return It('should execute the handler once, when emitted to twice', function(cb){
        return cb();
      });
    });
  });
});