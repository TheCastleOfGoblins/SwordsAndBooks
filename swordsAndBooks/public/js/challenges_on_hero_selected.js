
(function(){
    
    var socket = io(window.location.hostname);

    socket.on('challenged_' + heroId, function(details){
      console.log(details);
      $('#challengesBtn').css('background','white');
      setTimeout(function(){
        $('#challengesBtn').css('background','#222222');
      }, 500);
      var numberOfChallenges = parseInt($('#numberOfChallenges').text()) + 1;
      $('#numberOfChallenges').text(numberOfChallenges);
      

      var newRow ="<div class='row' data-id="+ details.challenger.id + ">" + 
              "<div class='span1'>" + 
                "<img src=" + details.challenger.image + " style='height:40px; width:40px'>" + 
              "</div>" + 
              "<div class='span2'>" + 
                "<h6>" + details.challenger.name + " ( "+ details.challenger.level + "Level )"+ "</h6>" + 

              "</div>" + 
              "<div class='span5'>" + 
                "<strong> Gender: </strong>" + details.challenger.gender + 
                "<strong> Race: </strong> " + details.challenger.race + 
                "<a href='javascript:;' data-heroId=" + details.challenger.id + " class='accept btn btn-default btn-small' style='margin:15px'>Accept</a>" + 
                "<a href='javascript:;' data-heroId=" + details.challenger.id + " class='decline btn btn-default btn-small' style='margin:15px'>Decline</a>" + 
              "</div>" + 
          "</div>";
      $("#challengesList").append(newRow);
      
      $('[data-id="' + details.challenger.id + '"] .accept').click(function(){
        console.log('accepted');
      });

      $('[data-id="' + details.challenger.id + '"] .decline').click(function(){
        socket.emit('decline', {challengerId: details.challenger.id });
        // $.post('/declineChallenge',{challengerId: details.challenger.id },function(response){
        //   console.log(response)
        // })
      });
    });
})();

$(document).ready(function(){
  $('#challengesBtn').click(function(){
    $('#challengesList').dialog({title:'Challenges', width:'90%'})
  });
});