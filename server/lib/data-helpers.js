"use strict";

const ObjectId = require('mongodb').ObjectId;

// Simulates the kind of delay we see with network or filesystem operations
  // No need to simulate delay while working with actual database
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  const tweets = db.collection('tweets');

  return {


    // Saves a tweet to `db`
    // saveTweet: function(newTweet, callback) {
    //   simulateDelay(() => {
    //     db.tweets.push(newTweet);
    //     callback(null, true);
    //   });
    // },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      tweets
        .find({})
        .toArray((err, results) => {
          if (err) {
            return res.status(500).json(err);
          }

        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        console.log(results.sort(sortNewestFirst));
        callback(results.sort(sortNewestFirst));

      });
    }

  };
}
