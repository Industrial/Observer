# Observable
An Observable mixin for adding event handling behaviour to a JavaScript
Function.

## Usage
    var MyClass = function MyClass() {
      Observable(this);
    };

    var myInstance = new MyClass();

    myInstance.on('hello', function(name) {
      console.log('Hello there, ' + name);
    });

    // somewhere down the line
    myInstance.emit('hello', 'Bob');

## Tests
    $ buster server;
    $ buster test;

## TODO
Document ALL THE THINGS!
