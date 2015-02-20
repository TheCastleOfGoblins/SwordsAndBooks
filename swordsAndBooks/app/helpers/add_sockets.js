exports.addChalangeSockets = function (self) {
	var io = require('socket.io').listen(geddy.server);
  	io.sockets.on('connection', function (socket) {
	  	socket.on('challenge',function(params){
	  		var hero = self.session.get('selectedHero');
		    		    
		    if(typeof params.challengedId == 'undefined'){
		      return;
		    }

		    geddy.model.Hero.first(params.challengedId, function(err, challengedHero){
		      
		      if(challengedHero.userId == self.session.get('userId') || err || !challengedHero){
		        self.respond({success:false},{format:'json'});
		        return;
		      }
		    
		      console.log('challenged_' + challengedHero.id);
		      
		      socket.emit('challenged_' + challengedHero.id, {challenger: hero.returnPublicInfo()});
		  	});
	  		
	  	});
	  	socket.on('accepted',function(params){
	  		console.log(this,params);
	  	});
	  	socket.on('decline',function(params){
	  		console.log(this,params);
	  	});
	    // socket.emit('challenged_' + challengedHero.id, {challenger: hero.returnPublicInfo()});
  	});
}