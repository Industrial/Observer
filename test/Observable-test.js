if (typeof require !== 'undefined') {
  var buster = require('buster'),
    sinon = require('sinon'),
    Observable = require('../lib/Observable').Observable;
}

buster.spec.expose();

var spec = describe('Observable', function() {
  before(function() {
    var Klass = function Klass() {
      Observable(this);
    };

    this.instance = new Klass();
  });

  after(function() {
    this.instance = undefined;
  });

  describe('#on', function() {
    describe('given an event and handler', function() {
      it('should contain the handler', function(cb) {
        var event = 'foo';
        var handler = sinon.spy();

        this.instance.on(event, handler);

        assert.isArray(this.instance.events[event]);
        assert.equals(this.instance.events[event][0], handler);

        cb();
      });
    });
  });

  describe('#off', function() {
    describe('given an event and handler', function() {
      it('should remove the handler', function(cb) {
        var event = 'foo';
        var handler = sinon.spy();

        this.instance.on(event, handler);
        this.instance.off(event, handler);

        assert.isArray(this.instance.events[event]);
        assert.equals(this.instance.events[event].length, 0);

        cb();
      });
    });

    describe('given an event', function() {
      it('should remove all handlers for that event', function(cb) {
        var event = 'foo';
        var handler = sinon.spy();

        this.instance.on(event, handler);
        this.instance.off(event);

        assert.equals(this.instance.events[event].length, 0);

        cb();
      });
    });

    describe('given no arguments', function() {
      it('should remove all handlers for all events', function(cb) {
        this.instance.on('foo', function() {});
        this.instance.on('bar', function() {});
        this.instance.off();

        assert.equals(this.instance.events, {});

        cb();
      });
    });
  });

  describe('#emit', function() {
    describe('given an event and some arguments', function() {
      it('should fire all handlers for that event with the arguments', function(cb) {
        var event = 'foo';
        var handler = sinon.spy();

        this.instance.on(event, handler);
        this.instance.on(event, handler);
        this.instance.emit(event, 1, 2, 3);

        assert.calledTwice(handler);
        assert.calledWith(handler, 1, 2, 3);

        cb();
      });
    });
  });

  describe('#once', function() {
    describe('given an event and handler', function() {
      describe('when emitted to once or more', function() {
        it('should run the handler once', function(cb) {
          var event = 'foo';
          var handler = sinon.spy();

          this.instance.once(event, handler);
          this.instance.emit(event);
          this.instance.emit(event);

          assert.calledOnce(handler);

          cb();
        });

        it('should remove the handler after having run once', function(cb) {
          var event = 'foo';
          var handler = sinon.spy();

          this.instance.once(event, handler);
          this.instance.emit(event);

          assert.equals(this.instance.events[event].length, 0);

          cb();
        });
      });
    });
  });

  describe('#listeners', function() {
    it('should return the array of listeners', function(cb) {
      var event = 'foo';
      var handler = sinon.spy();

      this.instance.on(event, handler);

      var listeners = this.instance.listeners(event);

      assert.isArray(listeners);
      assert.equals(listeners.length, 1);

      cb();
    });
  });

  describe('#hasListeners', function() {
    it('should return a boolean', function(cb) {
      var event = 'foo';
      var handler = sinon.spy();

      this.instance.on(event, handler);

      var hasListeners = this.instance.hasListeners(event);
      assert.isBoolean(hasListeners);
      assert.equals(hasListeners, true);

      this.instance.off();

      hasListeners = this.instance.hasListeners(event);
      assert.isBoolean(hasListeners);
      assert.equals(hasListeners, false);

      cb();
    });
  });
});
