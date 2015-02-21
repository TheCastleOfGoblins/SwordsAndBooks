var passport = require('../helpers/passport')
  , generateHash = passport.generateHash
  , requireAuth = passport.requireAuth
  , requireHeroSelected = passport.requireHeroSelected;

var Bosses = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
  
   this.before(requireAuth);
  
    this.before(requireHeroSelected)

  this.index = function (req, resp, params) {
    var self = this;
    geddy.model.Boss.all(function(err, bosses){
      if(err){
        throw err;
        return;
      }
      self.respond({bosses:bosses});
    });
  };
  this.startBattle = function(req, resp, params){
    var self = this;
    geddy.model.Boss.first(params.opponentId,function(err, opponent){

      var yourHero = self.session.get('selectedHero');
      self.session.set('opponent', opponent);

      // yourHero.currentHealth = yourHero.maxHealth;
      // opponent.currentHealth = opponent.maxHealth;

      var io = require('socket.io').listen(geddy.server);

      io.sockets.on('connection', function (socket) {

        socket.on('userAtack', function (attack) {
          var fullDamage = yourHero.damage();
          var blockDamage = 0
          

          var allPlaces = ['head', 'body', 'arms', 'legs'];

          var placeForDefence = shuffle(allPlaces);
          var blocked = false;
          var damageDone = 0;

          if(attack.zone == allPlaces[0] || attack.zone == allPlaces[1]){
            blocked = true;
            damageDone = opponent.block(fullDamage,false);
          }else{
            damageDone = opponent.takeDamage(fullDamage, false);
          }

          
          var win = false;
          if(opponent.currentHealth <= 0){
            win = true;
            opponent.currentHealth = 0;
          }

          socket.emit('enemyAtack', { succes: true, win:win, damageDone:damageDone, blocked:blocked, blockDamage:(fullDamage - damageDone), opponent:opponent });
          if(win){
            opponent.restore();
            opponent.looses += 1;
            //async operation
            opponent.save();
            yourHero.levelUp();
            yourHero.restore();
            // async operation
            yourHero.save();
          }
        });

        socket.on('userDefense', function (defense) {

          var fullDamage = opponent.damage();
          var blockDamage = 0

          var allPlaces = ['head', 'body', 'arms', 'legs'];

          var placeForAttack = shuffle(allPlaces)[0];
          var damageDone = 0;
          var blocked = false;

          if(defense.zone.indexOf(placeForAttack)> -1){
            blocked = true;
            damageDone = yourHero.block(fullDamage,false);
          }else{
            damageDone = yourHero.takeDamage(fullDamage,false);
          }

          var lose = false;

          if(damageDone < 0 ){
            damageDone = 0;
          }

          if(yourHero.currentHealth <=  0){
            lose = true;
            yourHero.currentHealth  = 0;
          }

          socket.emit('userDamageTaken', { lose:lose, damageDone:damageDone, blocked:blocked, blockDamage:fullDamage - damageDone, yourHero: yourHero});
          if(lose){
            yourHero.restore();
            opponent.wins +=1;
            opponent.restore();
            //async operation
            opponent.save()
          }
        });
      });

      self.respond({params:params, yourHero:yourHero, opponent:opponent},{format:'html',template: 'app/views/battle'})
    });
  }
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

exports.Bosses = Bosses;

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};