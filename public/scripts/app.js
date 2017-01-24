/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 function prettyDate(time){
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;

	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}
if ( typeof jQuery != "undefined" )
	jQuery.fn.prettyDate = function(){
		return this.each(function(){
			var date = prettyDate(this.title);
			if ( date )
				jQuery(this).text( date );
		});
	};


 $(document).ready(function() {
   console.log('ready!');
 });

 // Test / driver code (temporary). Eventually will get this from the server.
 var tweetData = {
   "user": {
     "name": "Newton",
     "avatars": {
       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
     },
     "handle": "@SirIsaac"
   },
   "content": {
     "text": "If I have seen further it is by standing on the shoulders of giants"
   },
   "created_at": 1461116232227
 }

 var $tweet = createTweetElement(tweetData);

createTweetElement(tweetData) {
 let imgURL = tweetData.users.avatars.small;
 let author = tweetData.users.name;
 let handle = tweetData.user.handle;
 let message = tweetData.content.text;
 let time = prettyDate(tweetData.created_at);
}
 // Test / driver code (temporary)
 console.log($tweet); // to see what it looks like




 // $('#tweets-container').append($tweet); to add it to the page so we can make sure it's got all the right elements, classes, etc.
