assert       = require \assert
{Observable} = require \../lib/Observable

# Livescript patch
It = it

describe \Observable, ->
  class Foo
    ->
      Observable this

  describe \#on, ->
    describe 'given an event name (String) and an event handler (Function)', ->
      It 'should contain the handler', (cb) ->
        o = new Foo

        handler = ->

        o.on \foo, handler

        assert.equal o.events.foo.0, handler

        cb!

  describe \#off, ->
    describe 'given an event name (String) and an event handler (Function)', ->
      It 'should remove the handler', (cb) ->
        o = new Foo

        handler = ->

        o.on \foo, handler
        o.off \foo, handler

        assert.equal o.events.foo.length, 0

        cb!

    describe 'given an event name (String)', ->
      It 'should remove all handlers for that event', (cb) ->
        o = new Foo

        o.on \foo, ->
        o.on \foo, ->

        assert.equal o.events.foo.length, 2

        o.off \foo

        assert.equal o.events.foo.length, 0

        cb!

    describe 'given no arguments', ->
      It 'should remove all handlers for all events', (cb) ->
        o = new Foo

        o.on \foo, ->
        o.on \baz, ->

        assert.equal o.events.foo.length, 1
        assert.equal o.events.baz.length, 1

        o.off!

        assert.equal (o.events.has-own-property \foo), false
        assert.equal (o.events.has-own-property \baz), false

        cb!

  describe \#emit, ->

  describe \#listeners, ->

  describe \#hasListeners, ->

  describe \#once, ->
    describe 'given an event name (String) and an event handler (Function)', ->
      It 'should contain the handler', (cb) ->
        o = new Foo

        handler = ->

        o.on \foo, handler

        assert.equal o.events.foo.0, handler

        cb!

      It 'should execute the handler once, when emitted to twice', (cb) ->
        cb!
