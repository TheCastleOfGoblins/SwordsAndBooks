var assert = require('assert')
  , tests
  , Book = geddy.model.Book;

tests = {

  'after': function (next) {
    // cleanup DB
    Book.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var book = Book.create({});
    book.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
