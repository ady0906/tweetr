
$(document).ready(function() {
  console.log('ready!');
  $("textarea").on('input', function() {
    var charCounter = $(this).parent().find('.counter');
    let tweetLength = 140 - $(this).val().length;
    charCounter.text(tweetLength.toString());
    if (tweetLength <= 0) {
      charCounter.text(tweetLength.toString()).css({'color': 'red'});
    } else if (tweetLength > 0) {
      charCounter.text(tweetLength.toString()).css({'color': 'black'});
    }
  })
});
