$( document ).ready(function() {
  $('#add-condition').on('click', function(e) {
    e.preventDefault();
    $('.conditions').append('Text: <input type="text" name=clickContidions[]> <a href="">Create the next episode</a><br>');
  });
});
