var assert = require('assert')
  , tests
  , Boss = geddy.model.Boss;

tests = {

  'after': function (next) {
    // cleanup DB
    Boss.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var boss = Boss.create({});
    boss.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
