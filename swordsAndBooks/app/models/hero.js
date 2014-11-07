var Hero = function () {

  this.defineProperties({
    name:{type:'string', required:true},
    gender:{type:'string', required: true }, 
    level: {type:'number', required: true},
    power:{type:'number',required: true}, 
    strength:{type:'number',required: true},
    speed:{type:'number',required: true},
    intelligence:{type:'number',required: true},
    image:{type:'string',required:true}
  });

  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
Hero.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Hero.someStaticMethod = function () {
  // Do some other stuff
};
Hero.someStaticProperty = 'YYZ';
*/

Hero = geddy.model.register('Hero', Hero);
