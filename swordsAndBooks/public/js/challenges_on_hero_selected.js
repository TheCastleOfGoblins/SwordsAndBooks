(function(){
    var socketForChallanges = io(window.location.hostname);
    
    socketForChallanges.on('challenged_' + heroId, function(details){
      console.log('challenged');
      $('#challengesBtn').css('background','white');
      setTimeout(function(){
        $('#challengesBtn').css('background','#222222');
      }, 500);
      var numberOfChallenges = parseInt($('#numberOfChallenges').text()) + 1;
      $('#numberOfChallenges').text(numberOfChallenges);
      console.log(details);

      var newRow ="<div class='hero-online row' id="+ details.challenger.id + ">" + 
              "<div class='span1'>" + 
                "<img src=" + details.challenger.image + " style='height:40px; width:40px'>" + 
              "</div>" + 
              "<div class='span2'>" + 
                "<h6>" + details.challenger.name + " ( "+ details.challenger.level + "Level )"+ "</h6>" + 

              "</div>" + 
              "<div class='span4'>" + 
                "<strong> Gender: </strong>" + details.challenger.gender + 
                "<strong> Race: </strong> " + details.challenger.race + 
                "<a href='javascript:;' data-heroId=" + details.challenger.id + " class='challange btn btn-default btn-small' style='margin:15px'>Accept</a>" + 
                "<a href='javascript:;' data-heroId=" + details.challenger.id + " class='challange btn btn-default btn-small' style='margin:15px'>Decline</a>" + 
              "</div>" + 
          "</div>";
      $("#challengesList").append(newRow);
    });
})();

$(document).ready(function(){
  $('#challengesBtn').click(function(){
    $('#challengesList').dialog({title:'Challenges', width:'90%'})
  });
});