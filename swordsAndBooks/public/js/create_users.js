$(document).ready(function () {
	// free username check:
	$('#username').change(function(e){

		$.get('/checkUserNa	me.json',{username:$(this).val()},function(response){
			$('.takenUserName').remove();
			if(!response.free){
				$('#username').after('<div class="takenUserName span4 alert alert-error" style="margin-top:10px;height:20px">This Account Name is already taken</div>')
			}else{
				$('#username').after('<div class="takenUserName span4 alert alert-success" style="margin-top:10px;height:20px">This Account Name free</div>')
			}
		})
	});
	
	$('#username').keydown(function(e){
		$("#givenName").val($(this).val());
	});
	
	// passwords matching check: 
	$('[type="submit"]').click(function(e){
		var passwords = $('[type="password"]');
		console.log(passwords.eq(0).val(), passwords.eq(1).val());

		if(passwords.eq(0).val() != passwords.eq(1).val()){
			passwords[0].setCustomValidity('Passwords must match.');
						
		}else{
			passwords[0].setCustomValidity('');
		}
	});
	
});
