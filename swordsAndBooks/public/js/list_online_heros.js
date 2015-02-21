(function () {
		
	
	var socket = io(window.location.hostname);

	function addRow(heroInfo){
		var newRow ="<div class='hero-online' id="+ heroInfo.id + ">" + 
					    "<div class='span1'>" + 
					      "<img src=" + heroInfo.image + " style='height:40px; width:40px'>" + 
					    "</div>" + 
					    "<div class='span2'>" + 
					      "<h6>" + heroInfo.name + " ( "+ heroInfo.level + "Level )"+ "</h6>" + 

					    "</div>" + 
					    "<div class='span3'>" + 
					      "<strong> Gender: </strong>" + heroInfo.gender + 
					      "<strong> Race: </strong> " + heroInfo.race + 
					      "<a href='javascript:;' data-heroId=" + heroInfo.id + " class='challenge btn btn-default btn-small' style='margin:2px'>Challange</a>" + 
					    "</div>" + 
					"</div>";


		$('.herosOnline').append(newRow);

		$('#' + heroInfo.id + ' a.challenge').click(function(){
			console.log('daaa');
			socket.emit('challenge',{challengedId:heroInfo.id});
			socket.once('declined_' + heroId + '_' + heroInfo.id , function(){
						alert(response.name + ' has declined your challange. What a pussy!')
					});
			// $.post('/challenge',{challengedId:heroInfo.id},function(response){
				
			// 	if(response.success){
			// 		console.log(response)
			// 		// console.log('declined_' + response.challengedId + '_' + heroId);
			// 		decliner.once('declined_' + response.challengedId + '_' + heroId, function(){
			// 			alert(response.name + ' has declined your challange. What a pussy!')
			// 		});
			// 		decliner.once('accepted_' + response.challengedId + '_' + myId,function(){
			// 			alert(response.name + ' is ready.Prepare for battle!')
			// 		});
			// 		alert('Challange Send Successfull');
			// 		console.log(response);
			// 	}else{
			// 		alert('Challange fail to Send');
			// 	}
			// });
			
		});
	}
	function getAllOnlineHeros(){
		$.get('/getOnlineHeros.json',{},function(response){
			$('.hero-online').each(function(){
				if(response.onlineIds.indexOf($(this).attr('id')) < 0){
					$(this).remove();
				}
			});

			response.onlineHeros.forEach(function(hero){
				if($('#' + hero.id).length == 0){
					addRow(hero);
				}
			});
		});
	}
	$(document).ready(function(){
		getAllOnlineHeros();
		setInterval(getAllOnlineHeros, 15000);
	})
})()

