$('h1').css('color', 'red');

$('input').keydown(function (event) {
  $('h1').text(event.key);
});
