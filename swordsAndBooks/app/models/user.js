var User = function () {
  this.defineProperties({
    username: {type: 'string', required: true, on: ['create', 'update']}
  , password: {type: 'string', required: true, on: ['create', 'update']}
  // , familyName: {type: 'string'}
  , givenName: {type: 'string'}
  , email: {type: 'string', required: true, on: ['create', 'update']}
  , activationToken: {type: 'string'}
  , activatedAt: {type: 'datetime'},
  });

  this.validatesLength('username', {min: 3});
  this.validatesLength('password', {min: 8});
  this.validatesConfirmed('password', 'confirmPassword');

  this.hasMany('Passports');
  this.hasMany('Heros');
  
  this.setAllHerosOffline = function(leaveOnlineHeroIds){
    var self = this;
    this.getHeros(function(err, heroes){
      
      heroes.forEach(function(hero){
        if(leaveOnlineHeroIds.indexOf(hero.id) < 0){
          hero.isOnline = false;
          //careful all here is async
          hero.save();
        }
      });
    });
  }  
};

User.prototype.isActive = function () {
  return !!this.activatedAt;
};

User = geddy.model.register('User', User);
