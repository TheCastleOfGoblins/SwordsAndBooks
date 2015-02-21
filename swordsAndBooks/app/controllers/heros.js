var passport = require('../helpers/passport')
  , generateHash = passport.generateHash
  , requireAuth = passport.requireAuth
  , requireHeroSelected = passport.requireHeroSelected;
var socketsInterface = require('../helpers/add_sockets.js');

var Heros = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.before(requireAuth);
  
  this.before(requireHeroSelected,{only:['navigation', 'getOnlineHeros','levelUp']})

  this.index = function (req, resp, params) {
    var self = this;
    
    geddy.model.Hero.all({userId:self.session.get('user').id},function(err, heros) {
      if (err) {
        throw err;
      }
      self.session.unset('selectedHero');
      self.respond({heros:heros});
    });
  };

  this.selectHero = function(req, resp, params){
    var self = this,
        user = self.session.get('user');
    geddy.model.Hero.first(params.heroId,function(err, hero){
      if(err || !hero){
        self.flash.error('No such hero.');
        self.redirect('/heros/');
      }
      if(hero.userId != user.id){
        self.flash.error('This hero is not yours');
        self.redirect('/heros');
        return;
      }

      hero.isOnline = true;
      user.setAllHerosOffline([hero.id]);
      hero.save(function(err, savedHero){
        self.session.set('selectedHero', savedHero);
        self.redirect('/navigation');
        // self.respond({params:params}, {template:'app/views/navigation'} )
      });
    });

  };
  this.levelUp = function(req, resp,params){
    var selectedHero = this.session.get('selectedHero');
    selectedHero.levelUp();
    //async operation
    selectedHero.save();
    this.redirect('/navigation');
  }

  this.navigation = function (req, resp, params) {
    // async operation
    socketsInterface.addChalangeSockets(this);
    this.session.set('winUrl', '/battleEnd/win');
    this.session.set('looseUrl', '/battleEnd/lose');
    this.respond({params:params}, {format: 'html',  template:'app/views/navigation'});
  };

  this.getOnlineHeros = function(req, resp, params){
    var self = this;
    geddy.model.Hero.all({and:[{isOnline:true}, {not:{id:self.session.get('selectedHero').id}}]},{sort:{name:'asc'}},function(err, online){
      self.respondTo({
        json:function(){
          online = online.map(function(hero){
            return hero.returnPublicInfo();
          });
          onlineIds = online.map(function(publicHero){
            return publicHero.id;
          });

          self.respond({onlineHeros: online, onlineIds:onlineIds});
        }
      })
    });
  };

  this.add = function (req, resp, params) {
    var newHero = {power:5, stamina:5, speed:5, armor:5, unusedPoints:10}
    this.respond({params: params, hero:newHero});
  };

  this.create = function (req, resp, params) {
    var self = this;

    params.maxHealth = 100;
    params.currentHealth = 100;
    params.expirience = 0;
    params.nextLevelExp = 100;
    params.level = 1;

    var sumOfAllPoints = 0;
    ['power','stamina', 'speed', 'armor'].forEach(function(key){
      params[key] = parseInt(params[key]);
      sumOfAllPoints += params[key];
    });
    
    params.isOnline = false;
      
    if(sumOfAllPoints > 20 + 10){
      self.flash.error('Uncorrect Hero data');
      self.redirect('/heros/add');
      return;
    }
    if(sumOfAllPoints < 20){
      self.flash.error('Uncorrect Hero data');
      self.redirect('/heros/add');
      return;
    }

    params.unusedPoints = 10 - (sumOfAllPoints - 20);
    
    var hero = geddy.model.Hero.create(params);
    hero.userId = self.session.get('userId');
    hero.updateHealth();

    if (!hero.isValid()) {
      self.flash.error(hero.errors);
      self.redirect('/heros/add');
    }
    else {
      hero.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.redirect('/heros/');
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Hero.first(params.id, function(err, hero) {
      if (err) {
        throw err;
      }
      if (!hero) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(hero);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Hero.first(params.id, function(err, hero) {
      if (err) {
        throw err;
      }
      if (!hero) {
        throw new geddy.errors.BadRequestError();
      }
      
      else {
        self.respondWith(hero);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Hero.first(params.id, function(err, hero) {
      if (err) {
        throw err;
      }

      if(hero.userId != self.session.get('userId')){
        self.flash.error('This hero is not yours.');
        self.redirect('/heros');
        return;
      }

      var sumOfAllUsedPoints = 0;
      ['power','stamina', 'speed', 'armor'].forEach(function(key){
        params[key] = parseInt(params[key]);
        sumOfAllUsedPoints += params[key] - hero[key];
      });

      if(sumOfAllUsedPoints > hero.unusedPoints){
        self.flash.error('Uncorrect data')
        self.redirect('/heros/');
        return;
      }
      params.unusedPoints = hero.unusedPoints - sumOfAllUsedPoints;
      
      hero.updateProperties(params);
      hero.updateHealth();
      if (!hero.isValid()) {
        self.flash.error('Uncorrect data')
        self.redirect('/heros/');
        return;
      }
      else {
        hero.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.redirect('/heros/');
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Hero.first(params.id, function(err, hero) {
      if (err) {
        throw err;
      }
      if (!hero) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Hero.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(hero);
        });
      }
    });
  };

};

exports.Heros = Heros;
