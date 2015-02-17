(function () {
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
					      "<a href='javascript:;' data-heroId=" + heroInfo.id + " class='challange btn btn-default btn-small' style='margin:2px'>Challange</a>" + 
					    "</div>" + 
					"</div>";


		$('.herosOnline').append(newRow);

		$('#' + heroInfo.id + ' a.challange').click(function(){
			
			$.post('/challenge',{challengedId:heroInfo.id},function(response){
				console.log(response);
				if(response.success){
					alert('Challange Send Successfull');
				}else{
					alert('Challange fail to Send');
				}
			});
			console.log('fua');
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

