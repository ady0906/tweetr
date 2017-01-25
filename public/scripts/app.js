/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // var prettydate = require("pretty-date");

 function createTweetElement(tweetData) {
    let $tweet = $("<article class='newTweet'>");
    let $header = $("<header class='header-tweet'>").appendTo($tweet);
    let $imgURL = $("<img>").attr("src", tweetData.user.avatars.small).appendTo($header);
    let $author = $("<div class='author'>").text(tweetData.user.name).appendTo($header);
    let $handle = $("<div class='handle'>").text(tweetData.user.handle).appendTo($header);
    let $message = $("<div class='message'>").text(tweetData.content.text).appendTo($tweet);
    let $time = $("<footer>").text(new Date(tweetData.created_at)).appendTo($tweet);
    let $hoverIcons = $("<div class='hoverIcons'>").html("<i class='fa fa-flag' aria-hidden='true'></i>&nbsp;&nbsp;<i class='fa fa-retweet' aria-hidden='true'></i>&nbsp;&nbsp;<i class='fa fa-heart' aria-hidden='true'></i>").appendTo($time);

   return $tweet;
  };

  function renderTweets(tweets) {
    $('#tweetsContainer').empty();
    tweets.forEach(function(tweet) {
      createTweetElement(tweet).appendTo($("#tweetsContainer"));
    });
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
  };



 $(document).ready(function() {

   function loadTweets() {
     $.ajax({
       url: '/tweets',
       method: 'GET',
       dataType: 'json',
       success: function(response) {
         console.log('Success!');
       renderTweets(response.reverse());
       }
     })
   };

   loadTweets();

// why is the default behavior not prevented when the function is underneath

    $("form").on("submit", function (event) {
     event.preventDefault();
     $.ajax({
       url: '/tweets',
       method: 'POST',
       data: $(this).serialize(),
       success: loadTweets
     });
   });

   $(".composeButton").on("click", function() {
     $(".new-tweet").slideToggle(400, function () {
       $("#writeTweet").focus();
     })
 });

  //  $(".newTweet").hover(function() {
  //     $(this).addClass("hover");
  //   }, function() {
  //     $(this).removeClass("hover");
  //   }
  // )

});


  // var $tweet = createTweetElement(tweetData);





 // Test / driver code (temporary). Eventually will get this from the server.







 // $('#tweets-container').append($tweet); to add it to the page so we can make sure it's got all the right elements, classes, etc.
