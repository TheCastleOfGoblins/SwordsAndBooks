var Battles = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    this.respond({params: params});
  };
  
  this.challenge = function(req, resp, params){

    var hero = this.session.get('selectedHero');
    var self = this;

    if(typeof params.challengedId == 'undefined'){
      self.respond({success:false},{format:'json'});
      return;
    }

    geddy.model.Hero.first(params.challengedId, function(err, challengedHero){
      if(challengedHero.userId == self.session.get('userId') || err || !challengedHero){
        self.respond({success:false},{format:'json'});
        return;
      }
      self.respond({success:true, test:'challenged_' + challengedHero.id},{format:'json'});

      var io = require('socket.io').listen(geddy.server);
      io.sockets.on('connection', function (socket) {

        socket.emit('challenged_' + challengedHero.id, {challenger: hero.returnPublicInfo()});
      });
    })
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    // Save the resource, then display index page
    this.redirect({controller: this.name});
  };

  this.show = function (req, resp, params) {
    this.respond({params: params});
  };

  this.edit = function (req, resp, params) {
    this.respond({params: params});
  };

  this.update = function (req, resp, params) {
    // Save the resource, then display the item page
    this.redirect({controller: this.name, id: params.id});
  };

  this.remove = function (req, resp, params) {
    this.respond({params: params});
  };

};

exports.Battles = Battles;

