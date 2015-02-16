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
			console.log('fua');
		});
	}
	function getAllOnlineHeros(){
		$.get('/getOnlineHeros.json',{},function(response){
			console.log(response);
			$('.hero-online').each(function(){
				if(response.onlineIds.indexOf($(this).attr('id')) < 0){
					$(this).remove();
				}
			});

			response.onlineHeros.forEach(function(hero){
				console.log(hero, $('#' + hero.id).length, $('#' + hero.id))
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

