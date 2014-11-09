var Episodes = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.all(function(err, episodes) {
      if (err) {
        throw err;
      }
      self.respondWith(episodes, {type:'Episode'});
    });
  };

  this.add = function (req, resp, params) {
    var self = this;
    geddy.model.Book.first(params.bookId,function(err,book){
      self.session.set('book',book);
      self.respond({params: params});
    });
    
  };

  this.create = function (req, resp, params) {

    var self = this
      , episode = geddy.model.Episode.create(params);

    
    if (!episode.isValid()) {
      this.respondWith(episode);
    }
    else {
      episode.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(episode, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.first(params.id, function(err, episode) {
      if (err) {
        throw err;
      }
      if (!episode) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(episode);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.first(params.id, function(err, episode) {
      
      geddy.model.Episode.all({bookId:episode.bookId},function(err, allEpisodesFromTheBook){
        
        if (err) {
          throw err;
        }
        if (!episode) {
          throw new geddy.errors.BadRequestError();
        }
        else {
          // console.log(allEpisodesFromTheBook);
          self.respond({episode: episode, allEpisodesFromTheBook:allEpisodesFromTheBook});
        }
      });
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.first(params.id, function(err, episode) {
      if (err) {
        throw err;
      }

      if (!episode.isValid()) {
        self.respondWith(episode);
      }
      else {
        var async = require('async');
      
        var i =0 ;
        if(!params.clickContidions){
          episode.updateProperties(params);
            
          episode.save(function(err, data) {
            self.redirect('/episodes/' + episode.id + '/edit')
          });
          return;
        }
        async.each(params.clickContidions, function(clickContidion,  callback){
          var childNode = {
            title: clickContidion.title,
            story: '',
            isFinal: false,
            isFirst: false,
            coordX: clickContidion.coordX,
            coordY: clickContidion.coordY,
            clickContidions: [],
            bookId: episode.bookId
          }

          var childEpisode =  geddy.model.Episode.create(childNode);

          childEpisode.save(function(err, save){
            i++;
            clickContidion.id = save.id;
            if(params.clickContidions.length == i+1){
              callback('sdas');
            }
          });
        }, function(err) {
              episode.updateProperties(params)
              
              episode.save(function(err, data) {
              if (err) {
                throw err;
              }
              self.redirect('/episodes/' + data.clickContidions[1].id +'/edit');
          });
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Episode.first(params.id, function(err, episode) {
      if (err) {
        throw err;
      }
      if (!episode) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Episode.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(episode);
        });
      }
    });
  };

};


exports.Episodes = Episodes;
