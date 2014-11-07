var assert = require('assert')
  , tests
  , Condition = geddy.model.Condition;

tests = {

  'after': function (next) {
    // cleanup DB
    Condition.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var condition = Condition.create({});
    condition.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
