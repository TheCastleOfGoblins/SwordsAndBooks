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
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , hero = geddy.model.Hero.create(params);

    if (!hero.isValid()) {
      this.respondWith(hero);
    }
    else {
      hero.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(hero, {status: err});
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
