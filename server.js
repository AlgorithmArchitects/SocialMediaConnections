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

var lookupTwitterFriends = function(i, ids, users, res){

    console.log(i);
    var second = (i+100 < ids.length) ? i+100 : ids.length;
    var these_ids = ids.slice(i, second).join(", ");
    i = second;
    console.log(i);
    console.log(these_ids);
    console.log(ids.length);
    twitterClient.post('users/lookup', {user_id: these_ids}, function(error, friends, response) {
        if (error){
            console.log("lookup error");
            console.log(error);
            res.status(500);
            res.send(error);
            return;
        }
        for(u in friends){
            var obj = {};
            for(var value in valuesToReturn){
                var key = valuesToReturn[value];
                obj[key] = friends[u][key];
            }
            users.push(obj);
        }

        if(i == ids.length){
            console.log("Response:");
            console.log(users);
            res.send(users);
            return;
        }
        else{
            return lookupTwitterFriends(i, ids, users, res);
        }

    });
};


var getTwitterFriends = function(cursor, ids, res, screen_name){
    var params = {screen_name: screen_name, skip_status: true, cursor: cursor};
    twitterClient.get('friends/ids', params, function(error, friends, response) {
        if (error){
            console.log("ids error");
            console.log(error);
            res.status(500);
            res.send(error);
            return;
        }
        for(u in friends.ids){
            ids.push(friends.ids[u]);
        }
        if(friends.next_cursor != 0){
            return getTwitterFriends(friends.next_cursor, ids, res, screen_name);
        }
        else{
            return lookupTwitterFriends(0, ids, [], res);
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
        getTwitterFriends(-1, [], res, screen_name);
        return;
    }
});

app.listen(3001, function () {
      console.log('Example app listening on port 3001!');
});
