/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// function to format the date in proper twitter fashion

 function timeDifference(current, previous) {

     var msPer2Minutes = 120 * 1000;
     var msPerHour = msPer2Minutes * 30;
     var msPerDay = msPerHour * 24;
     var msPerMonth = msPerDay * 30;
     var msPerYear = msPerDay * 365;
     var elapsed = current - previous;

     if (elapsed < msPer2Minutes) {
          return 'Just now';
     } else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPer2Minutes) + ' minutes ago';
     } else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour ) + ' hours ago';
     } else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';
     } else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';
     } else {
         return Math.round(elapsed/msPerYear ) + ' years ago';
     }
 }

// function to render the tweets into properly styled HTML articles

 function createTweetElement(tweetData) {
    let $tweet = $("<article class='newTweet'>");
    let $header = $("<header class='header-tweet'>").appendTo($tweet);
    let $imgURL = $("<img>").attr("src", tweetData.user.avatars.small).appendTo($header);
    let $author = $("<div class='author'>").text(tweetData.user.name).appendTo($header);
    let $handle = $("<div class='handle'>").text(tweetData.user.handle).appendTo($header);
    let $message = $("<div class='message'>").text(tweetData.content.text).appendTo($tweet);
    let $time = $("<footer>").text(timeDifference(Date.now(),tweetData.created_at)).appendTo($tweet);
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

// load tweets through ajax

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

// submit tweet to ajax if certain conditions are met
// print flash messages if they are not

    $("form").on("submit", function (event) {
     event.preventDefault();
     if ($('#writeTweet').val().length > 140) {
       $('#over140').slideDown(function() {
         setTimeout(function() {
           $('#over140').slideUp();
         }, 2000);
       });
       return;
     } else if ($('#writeTweet').val() == "" || $('#writeTweet').val() == null) {
       $('#absentTweet').slideDown(function() {
         setTimeout(function() {
           $('#absentTweet').slideUp();
         }, 2000);
       });
       return;
     } else {
       $.ajax({
         url: '/tweets',
         method: 'POST',
         data: $(this).serialize(),
         success: loadTweets
       });
       $('#writeTweet').val('');
       $('.counter').text('140');
      }
     });

   $(".composeButton").on("click", function() {
     $(".new-tweet").slideToggle(400, function () {
       $("#writeTweet").focus();
     })
   });
});
