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
        var visibleEpisodes = self.session.get('visibleEpisodes') || [];

        if(visibleEpisodes.length == 0 || visibleEpisodes[visibleEpisodes.length - 1].id != episode.id){
          visibleEpisodes = visibleEpisodes.map(function(prevEp){
            prevEp.current = false;
            return prevEp;
          });

          var episodeFiltered = {title:episode.title,
                               x:episode.coordX,
                               y:episode.coordY, url:'/episodes/' + episode.id + '/edit',
                               id:episode.id,
                               current: true,
                               first:episode.isFirst,
                               clickContidions:episode.clickContidions};
          visibleEpisodes.push(episodeFiltered);
        }
        self.session.set('visibleEpisodes', visibleEpisodes);
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
          geddy.model.Hero.all(function(err, allHeroes){
            self.respond({episode: episode, allEpisodesFromTheBook:allEpisodesFromTheBook, allHeroes:allHeroes});
          });
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

        params.chess =   (params.chess == 'on');

        console.log('--------------------');
        console.log(params.chess);
        console.log('--------------------');

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
