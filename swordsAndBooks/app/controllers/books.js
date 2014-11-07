var Books = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Book.all(function(err, books) {
      if (err) {
        throw err;
      }
      self.respondWith(books, {type:'Book'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , book = geddy.model.Book.create(params);

    if (!book.isValid()) {
      this.respondWith(book);
    }
    else {
      book.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(book, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Book.first(params.id, function(err, book) {
      if (err) {
        throw err;
      }
      if (!book) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(book);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Book.first(params.id, function(err, book) {
      if (err) {
        throw err;
      }
      if (!book) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(book);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Book.first(params.id, function(err, book) {
      if (err) {
        throw err;
      }
      book.updateProperties(params);

      if (!book.isValid()) {
        self.respondWith(book);
      }
      else {
        book.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(book, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Book.first(params.id, function(err, book) {
      if (err) {
        throw err;
      }
      if (!book) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Book.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(book);
        });
      }
    });
  };

};

exports.Books = Books;
