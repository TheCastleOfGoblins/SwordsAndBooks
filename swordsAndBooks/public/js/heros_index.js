console.log('heroes')
$(document).ready(function(){
	$('.heroActions').click(function() {
		window.location.href = '/selectHero/' + $(this).attr('id');
	});

	$('.addHero').click(function(){
		window.location.href = '/heros/add';
	});

	$('.editHero').click(function(){
		window.location.href = '/heros/' + $(this).attr('data-heroId') + '/edit';
		return false;
	})

})
