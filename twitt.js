var TwitterPackage = require('twitter');

// importing my secret.json file
var secret = require("./keys");

// my secret.json file looks like this:
{
    consumer_key: 'b4Ft5mN2oJiw98DfoO3w0qeSp',
    consumer_secret: 'hvjxQqIiFO0pQvxHf7v1EDCOFykwZrvqdJ7hthNSJhkCk1YfzB',
    access_token_key: '880837456081428480-QsczBJdTX4SvEI8T03EHupOWEkKFA6v',
    access_token_secret: 'CrEjiQTZ2fOt5sghNNqqatfvDEefdVYCdNiDK8xYtarSf',
}

//make a new Twitter object
var Twitter = new TwitterPackage(secret);

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', { track: '#TechKnightsDemo' }, function(stream) {

    // ... when we get tweet data...
    stream.on('data', function(tweet) {

        // print out the text of the tweet that came in
        console.log(tweet.text);

        //build our reply object
        var statusObj = { status: "Hi @" + tweet.user.screen_name + ", How are you?" }

        //call the post function to tweet something
        Twitter.post('statuses/update', statusObj, function(error, tweetReply, response) {

            //if we get an error print it out
            if (error) {
                console.log(error);
            }

            //print the text of the tweet we sent out
            console.log(tweetReply.text);
        });
    });

    // ... when we get an error...
    stream.on('error', function(error) {
        //print out the error
        console.log(error);
    });
});