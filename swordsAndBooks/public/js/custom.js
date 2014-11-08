$( document ).ready(function() {
  $('#add-condition').on('click', function(e) {
    e.preventDefault();
    $('.conditions').append('Text: <input type="text" name=conditions[]> <a href="">Create the next episode</a><br>');
  });
});
