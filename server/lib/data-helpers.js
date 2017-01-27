"use strict";

const ObjectId = require('mongodb').ObjectId;

// defines helper functions for saving and getting tweets, using the database db

module.exports = function makeDataHelpers(db) {

  const tweets = db.collection('tweets');

  return {

// saves tweets to db

    saveTweet: function(newTweet, callback) {
      tweets
        .insertOne(newTweet);
        callback(null, true);
    },

// db request to get tweets

    getTweets: function(callback) {
      tweets
        .find({})
        .toArray((err, results) => {
          if (err) {
            return res.status(500).json(err);
          }
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(results.sort(sortNewestFirst));
      });
    }
  };
}
