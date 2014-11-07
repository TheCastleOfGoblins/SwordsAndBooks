var assert = require('assert')
  , tests
  , Hero = geddy.model.Hero;

tests = {

  'after': function (next) {
    // cleanup DB
    Hero.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var hero = Hero.create({});
    hero.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
