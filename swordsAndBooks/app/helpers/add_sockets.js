exports.addChalangeSockets = function (self) {
	var io = require('socket.io').listen(geddy.server);
	// io.set('transports',['xhr-polling']);
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
		      
		      io.sockets.emit('challenged_' + challengedHero.id, {challenger: hero.returnPublicInfo()});
		  	});
	  		
	  	});
	  	socket.on('accepted',function(params){
	  		console.log(this,params);
	  	});
	  	socket.on('decline',function(params){
	  		if(typeof self.session.get('selectedHero') == 'undefined'){
    		  	this.respond({success:false},{format:'json'});
				return;
			}
			console.log(this,'declined_' + self.session.get('selectedHero').id + '_' + params.challengerId);
        	io.sockets.emit('declined_' + self.session.get('selectedHero').id + '_' + params.challengerId, self.session.get('selectedHero').returnPublicInfo());
	  	});
	    // socket.emit('challenged_' + challengedHero.id, {challenger: hero.returnPublicInfo()});
  	});
}