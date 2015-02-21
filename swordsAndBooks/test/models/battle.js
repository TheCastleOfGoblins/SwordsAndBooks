var assert = require('assert')
  , tests
  , Battle = geddy.model.Battle;

tests = {

  'after': function (next) {
    // cleanup DB
    Battle.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var battle = Battle.create({});
    battle.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

// tests['simple test if the model saves without a error']();
module.exports = tests;
