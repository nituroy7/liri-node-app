// import API credentials keys
var keys = require('./keys.js');

// import dependencies
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var Twitter = require('twitter');

// initiate the processing on command execution
initiate(null, null);

// This function initiates the requested processing
function initiate(command, argument) {
    if (typeof(command) == 'undefined' || command === null) {
        command = process.argv[2];
        argument = process.argv[3];
    }
    switch (command) {
        case 'my-tweets':
            tweetify(argument);
            break;
        case 'spotify-this-song':
            spotify(argument);
            break;
        case 'movie-this':
            moviefy(argument);
            break;
        case 'do-what-it-says':
            dowhatify();
            break;
        default:
            console.log('\nUsage: node liri.js <command> <argument>');
            console.log('\nCommands - \n1. my-tweets\n2. spotify-this-song <song name> \n3. movie-this <movie name>\n4. do-what-it-says');
            process.exit();
    }
}

// This function fetches tweets for a twitter ID in the argument from Twitter
function tweetify(argument) {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    var params = {
        user_id: argument,
        since_id: 5,
        max_id: 3,
        count: 2
    };
    client.get('statuses/user_timeline', argument, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);

        } else {
            console.log(error);
        }
    });
}

// This function searches Spotify through search API 
// for the requested track details in the argument
function spotify(argument) {
    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
    });
    spotify.search({ type: 'track', query: argument, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Preview: ' + data.tracks.items[0].preview_url);
        console.log('Album:' + data.tracks.items[0].album.name);
    });
}

// This function searches OMDB through search API 
// for the requested movie details in the argument
function moviefy(argument) {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            //Title of the movie.
            console.log("Title : " + JSON.parse(body).Title);
            // Year the movie came out.
            console.log("Release Year : " + JSON.parse(body).Year);
            // IMDB Rating of the movie.
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            // Rotten Tomatoes Rating of the movie.
            // Country where the movie was produced
            console.log("Country: " + JSON.parse(body).Country);
            // Language of the movie.
            console.log("Language : " + JSON.parse(body).Language);
            // Plot of the movie
            console.log("Plot : " + JSON.parse(body).Plot);
            // Actors in the movie.
            console.log("Actors : " + JSON.parse(body).Actors);
        }
    });
}

// This function reads the command and argument from the 
// file random.txt and execute the command provided in it
function dowhatify() {
    var content = fs.readFileSync("random.txt", 'utf8').toString();
    //console.log(content);
    var comm = content.substring(0, content.indexOf(","));
    var arg = content.substring(content.indexOf(",") + 1, content.length);
    //console.log(comm);
    //console.log(arg);

    // call initiate function with the extracted command and argument
    initiate(comm, arg)
}
