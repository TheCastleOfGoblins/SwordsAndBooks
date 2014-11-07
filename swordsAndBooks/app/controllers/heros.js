var Heros = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Hero.all({userId:params.userId},function(err, heros) {
      if (err) {
        throw err;
      }
      self.respondWith(heros, {type:'Hero'});
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
