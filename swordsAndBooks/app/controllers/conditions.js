
var passport = require('../helpers/passport')
  , generateHash = passport.generateHash
  , requireAuth = passport.requireAuth;

var Conditions = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
  this.before(requireAuth);
  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Condition.all(function(err, conditions) {
      if (err) {
        throw err;
      }
      self.respondWith(conditions, {type:'Condition'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , condition = geddy.model.Condition.create(params);

    if (!condition.isValid()) {
      this.respondWith(condition);
    }
    else {
      condition.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(condition, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Condition.first(params.id, function(err, condition) {
      if (err) {
        throw err;
      }
      if (!condition) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(condition);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Condition.first(params.id, function(err, condition) {
      if (err) {
        throw err;
      }
      if (!condition) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(condition);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Condition.first(params.id, function(err, condition) {
      if (err) {
        throw err;
      }
      condition.updateProperties(params);

      if (!condition.isValid()) {
        self.respondWith(condition);
      }
      else {
        condition.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(condition, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Condition.first(params.id, function(err, condition) {
      if (err) {
        throw err;
      }
      if (!condition) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Condition.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(condition);
        });
      }
    });
  };

};

exports.Conditions = Conditions;
