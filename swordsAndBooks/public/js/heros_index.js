console.log('heroes')
$(document).ready(function(){
	$('.heroActions').click(function() {
		window.location.href = '/selectHero/' + $(this).attr('id');
	});

	$('.addHero').click(function(){
		window.location.href = '/heros/add';
	});

})
