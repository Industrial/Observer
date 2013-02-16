# Observable
An Observable mixin for adding event handling behaviour to a JavaScript
Function.

## Usage
    var myObserver = new Observer();

    myObserver.on('hello', function(name) {
      console.log('Hello there, ' + name);
    });

    // somewhere down the line
    myObserver.emit('hello', 'Bob');

For the full API, see the tests for now.

## Tests
    $ npm test;

