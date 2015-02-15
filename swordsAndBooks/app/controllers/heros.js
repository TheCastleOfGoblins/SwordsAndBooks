var passport = require('../helpers/passport')
  , generateHash = passport.generateHash
  , requireAuth = passport.requireAuth;

var Heros = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.before(requireAuth);

  this.index = function (req, resp, params) {
    var self = this;
    
    geddy.model.Hero.all({userId:self.session.get('user').id},function(err, heros) {
      if (err) {
        throw err;
      }
      
      self.respond({heros:heros});
    });
  };

  this.selectHero = function(req, resp, params){
    var self = this;
    geddy.model.Hero.first(params.heroId,function(err, hero){
      if(err || !hero){
        self.flash.error('No such hero.');
        self.redirect('/heros/');
      }
      
      self.session.set('selectedHero', hero);
      self.redirect('/navigation');
      self.respond({params:params}, {template:'app/views/navigation'} )
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
    params.image = '/';
    var hero = geddy.model.Hero.create(params);
    hero.userId = self.session.get('userId');
    
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
      hero.updateProperties(params);

      if (!hero.isValid()) {
        self.respondWith(hero);
      }
      else {
        hero.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(hero, {status: err});
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
