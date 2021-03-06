/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
var strategies = require('../helpers/passport/strategies')
  , authTypes = geddy.mixin(strategies, {local: {name: 'local account'}});;

  // var passport = require('../helpers/passport')
  // , generateHash = passport.generateHash
  // , requireAuth = passport.requireAuth
  // , requireHeroSelected = passport.requireHeroSelected

var Main = function () {
  
  this.index = function (req, resp, params) {
    var self = this
      , User = geddy.model.User;
    User.first({id: this.session.get('userId')}, function (err, user) {
      var data = {
        user: null
      , authType: null
      };
      if (user) {
        data.user = user;
        data.authType = authTypes[self.session.get('authType')].name;
      }
      self.respond(data, {
        format: 'html'
      , template: 'app/views/main/index'
      });
    });
  };

  this.login = function (req, resp, params) {
    if(typeof this.session.get('userId') != 'undefined'){
      this.redirect('/heros/')
    }
    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/login'
    });
    
  };

  this.logout = function (req, resp, params) {
    
    var hero = this.session.get('selectedHero');
    if(typeof hero != 'undefined'){
      hero.isOnline = false;
      //async save here 
      hero.save();
    }

    this.session.unset('userId');
    this.session.unset('authType');


    this.session.unset('selectedHero');
    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/logout'
    });
  };

  this.startBattle = function(req, resp, params){
    var self = this;
    geddy.model.Hero.first(params.opponentId,function(err, opponent){
      console.log(params.opponentId,opponent)
      var yourHero = self.session.get('selectedHero');
      self.session.set('opponent', opponent);

      yourHero.currentHealth = yourHero.maxHealth;
      opponent.currentHealth = opponent.maxHealth;

      var io = require('socket.io').listen(geddy.server);

      io.sockets.on('connection', function (socket) {

        socket.on('userAtack', function (attack) {
          var fullDamage = yourHero.power + yourHero.level*(Math.random() * 3);
          fullDamage = Math.ceil(fullDamage);

          var blockDamage = opponent.speed + opponent.level*(Math.random() * 4);
          blockDamage = Math.ceil(blockDamage);

          var allPlaces = ['head', 'body', 'arms', 'legs'];

          var placeForDefence = shuffle(allPlaces);
          var damageDone = fullDamage;
          var blocked = false;

          if(attack.zone == allPlaces[0] || attack.zone == allPlaces[1]){
            blocked = true;
            damageDone -= blockDamage;
          }

          if(damageDone < 0 ){
            damageDone = 0;
          }

          opponent.currentHealth -= damageDone;

          var win = false;
          if(opponent.currentHealth <= 0){
            win = true;
            opponent.currentHealth = opponent.maxHealth;
          }



          opponent.save(function(err, opponentSaved){
            socket.emit('enemyAtack', { succes: true, win:win, damageDone:damageDone, blocked:blocked, blockDamage:blockDamage, opponent:opponentSaved });
          });
        });

        socket.on('userDefense', function (defense) {

          var fullDamage = opponent.power + opponent.level*(Math.random() * 3);
          fullDamage = Math.ceil(fullDamage);

          var blockDamage = yourHero.speed + yourHero.level*(Math.random() * 4);
          blockDamage = Math.ceil(blockDamage);

          var allPlaces = ['head', 'body', 'arms', 'legs'];

          var placeForAttack = shuffle(allPlaces)[0];
          var damageDone = fullDamage;
          var blocked = false;
          if(defense.zone.indexOf(placeForAttack)> -1){
            blocked = true;
            damageDone -= blockDamage;
          }

          var lose = false;

          if(damageDone < 0 ){
            damageDone = 0;
          }

          yourHero.currentHealth -= damageDone;

          if(yourHero.currentHealth <=  0){
            lose = true;
            yourHero.currentHealth  = yourHero.maxHealth;
          }

          socket.emit('userDamageTaken', { lose:lose, damageDone:damageDone, blocked:blocked, blockDamage:blockDamage, yourHero: yourHero});
        });
      });


      self.respond({params:params, yourHero:yourHero, opponent:opponent},{format:'html',template: 'app/views/battle', layout:false})
    });
  }
  this.battleEnd = function(req,resp, params){
    if(params.end == 'win'){
      this.respond({params:params},{format: 'html',template:'app/views/win'});
    }else{
      this.respond({params:params},{format: 'html',template:'app/views/lose'});
    }
  }

  this.chess = function (req, resp, params) {
    this.respond({params:params}, {format: 'html',  template:'app/views/chess'});
  }
  
  this.target = function (req, resp, params) {
    this.respond({params:params}, {format: 'html',  template:'app/views/target'});
  }
};

exports.Main = Main;

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
