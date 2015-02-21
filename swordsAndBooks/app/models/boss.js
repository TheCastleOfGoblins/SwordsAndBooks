var Boss = function () {

  this.defineProperties({
    name:{type:'string', required:true},
    maxHealth: {type:'number',required:true},
    currentHealth: {type:'number',required:true},
    expirience: {type:'number',required:true},
    nextLevelExp: {type:'number',required:true}, 

    gender:{type:'string', required: true }, 
    race: {type:'string', required: true},
    level: {type:'number', required: true},
    
    power:{type:'number',required: true}, 
    stamina:{type:'number',required: true},
    speed:{type:'number',required: true},
    armor:{type:'number',required: true},

    image:{type:'string',required:true},
    wins: {type: 'number'},
    looses: {type: 'number'}
  });
  
  this.damage = function(){
    return parseInt(Math.random() * 3 * this.level + this.power);
  }

  this.updateHealth = function(){
    this.currentHealth = 20 * this.stamina;
    this.maxHealth = this.currentHealth;
  }

  this.block = function(damage, pure){
    damage -= parseInt(3 * this.speed + this.level*(Math.random() * 4));
    if(damage < 0){
      damage  = 0 ;
    }
    return this.takeDamage(damage,pure);
  }

  this.takeDamage = function(damage, pure){
    if(!pure){
      damage  = damage - this.armor;
    }

    if(damage < 0){
      damage = 0;
    }

    this.currentHealth -= damage;
    return damage;
  }
  this.restore = function(){
    this.currentHealth = this.maxHealth;
  }
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
Boss.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Boss.someStaticMethod = function () {
  // Do some other stuff
};
Boss.someStaticProperty = 'YYZ';
*/

exports.Boss = Boss;

