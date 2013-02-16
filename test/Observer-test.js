var chai = require('chai'),
  sinon = require('sinon'),
  assert = chai.assert,
  Observer = require('../lib/Observer').Observer;

describe('Observer', function() {
  var event = 'foo',
    handler = function() {};

  beforeEach(function() {
    this.instance = new Observer();
  });

  afterEach(function() {
    this.instance = undefined;
  });

  describe('#on', function() {
    describe('given an event and handler', function() {
      it('should contain the handler', function() {
        this.instance.on(event, handler);

        assert.isArray(this.instance.events[event]);
        assert.equal(this.instance.events[event][0], handler);
      });
    });
  });

  describe('#off', function() {
    describe('given an event and handler', function() {
      it('should remove the handler', function() {
        this.instance.on(event, handler);
        this.instance.off(event, handler);

        assert.isArray(this.instance.events[event]);
        assert.equal(this.instance.events[event].length, 0);
      });
    });

    describe('given an event', function() {
      it('should remove all handlers for that event', function() {
        this.instance.on(event, handler);
        this.instance.off(event);

        assert.equal(this.instance.events[event].length, 0);
      });
    });

    describe('given no arguments', function() {
      it('should remove all handlers for all events', function() {
        this.instance.on('foo', handler);
        this.instance.on('bar', handler);
        this.instance.off();

        assert.isObject(this.instance.events);
        assert.deepEqual(this.instance.events, {});
      });
    });
  });

  describe('#emit', function() {
    describe('given an event and some arguments', function() {
      it('should fire all handlers for that event with the arguments', function() {
        var handler = sinon.spy();

        this.instance.on(event, handler);
        this.instance.on(event, handler);
        this.instance.emit(event, 1, 2, 3);

        sinon.assert.calledTwice(handler);
        sinon.assert.calledWith(handler, 1, 2, 3);
      });
    });
  });

  describe('#once', function() {
    describe('given an event and handler', function() {
      describe('when emitted to once or more', function() {
        it('should run the handler once', function() {
          var handler = sinon.spy();

          this.instance.once(event, handler);
          this.instance.emit(event);
          this.instance.emit(event);

          sinon.assert.calledOnce(handler);
        });

        it('should remove the handler after having run once', function() {
          this.instance.once(event, handler);
          this.instance.emit(event);

          assert.equal(this.instance.events[event].length, 0);
        });
      });
    });
  });

  describe('#getListeners', function() {
    it('should return the array of listeners', function() {
      var listeners;

      this.instance.on(event, handler);

      listeners = this.instance.getListeners(event);

      assert.isArray(listeners);
      assert.equal(listeners.length, 1);
    });
  });

  describe('#hasListeners', function() {
    it('should return a boolean', function() {
      var hasListeners;

      this.instance.on(event, handler);

      hasListeners = this.instance.hasListeners(event);
      assert.isBoolean(hasListeners);
      assert.equal(hasListeners, true);

      this.instance.off();

      hasListeners = this.instance.hasListeners(event);
      assert.isBoolean(hasListeners);
      assert.equal(hasListeners, false);
    });
  });
});
