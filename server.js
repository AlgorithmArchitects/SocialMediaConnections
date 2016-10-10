var Twitter = require('twitter');
var express = require('express');
var config = require('./config');
var app = express();

// a cache object indexed by twitter and then by screen name
var cache = {twitter: {}};

var twitterClient = new Twitter({
    consumer_key: config.twitter_consumer_key,
    consumer_secret: config.twitter_consumer_secret,
    access_token_key: config.twitter_access_token_key,
    access_token_secret: config.twitter_access_token_secret
});

var valuesToReturn = ['id', 'name', 'screen_name', 'profile_image_url'];

var getFriends = function(cursor, users, res, screen_name){
    if(screen_name in cache.twitter){
      console.log("Response:");
      console.log(cache.twitter[screen_name]);
      res.send(cache.twitter[screen_name]);
      return;
    }
    var params = {screen_name: screen_name, skip_status: true, cursor: cursor};
    twitterClient.get('friends/list', params, function(error, friends, response) {
        console.log(error);
        console.log(friends);
        if (error){
            res.status(500);
            res.send(error);
            return;
        }
        for(u in friends.users){
            var obj = {};
            for(var i in valuesToReturn){
                var key = valuesToReturn[i];
                obj[key] = friends.users[u][key];
            }
            users.push(obj);
        }
        if(friends.next_cursor != 0){
            return getFriends(friends.next_cursor, users, res, screen_name);
        }
        else{
            console.log("Response:");
            console.log(users);
            cache.twitter[screen_name] = users;
            res.send(users);
            return;
        }
    });
}

app.use(express.static(__dirname + '/build'));

app.get('/twitter', function (req, res) {
    var screen_name = req.query.screen_name;
    console.log("Screen name: " + screen_name);
    if(!screen_name){
        console.log('Response: {error: "screen_name is required"}');
        res.send({error: "screen_name is required"});
        return;
    }
    else{
        getFriends(-1, [], res, screen_name);
        return;
    }
});

app.listen(3001, function () {
      console.log('Example app listening on port 3001!');
});
