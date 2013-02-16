# Observer
An Observer prototype function for event based programming.

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

