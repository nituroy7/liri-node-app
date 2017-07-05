// import API credentials keys
var keys = require('./keys.js');

// import dependencies
var request = require('request');
var Spotify = require('node-spotify-api');

// initiate the processing on command execution
initiate();

function initiate() {
    var command = process.argv[2];
    var argument = process.argv[3];
    switch (command) {
        case 'my-tweets':
            tweetify(command, argument);
            break;
        case 'spotify-this-song':
            spotify(command, argument);
            break;
        case 'movie-this':
            moviefy(command, argument);
            break;
        case 'do-what-it-says':
            dowhatify(command, argument);
            break;
        default:
            console.log('\nUsage: node liri.js <command> <argument>');
            console.log('\nCommands - \n1. my-tweets\n2. spotify-this-song <song name> \n3. movie-this <movie name>\n4. do-what-it-says');
            process.exit();
    }
}


function tweetify(command, argument) {
    console.log(command + ',' + argument);
}

function spotify(command, argument) {
    console.log(command + ',' + argument);

    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
    });

    spotify.search({ type: 'track', query: argument, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data));

        // console.log('Artist:' + data.tracks.items.album);
        // console.log('Song:');
        // console.log('Preview link of the song from Spotify:');
        // console.log('Album:');

        // });

        // var queryURL = "https://api.spotify.com/v1/search?q=" + argument + "&type=artist";


        // request(queryUrl, function(error, response, body) {

        //     // If the request is successful
        //     if (!error && response.statusCode === 200) {

        //         console.log(JSON.parse(body));


        //     }
        // });
    });


    function moviefy(command, argument) {

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

    function dowhatify(command, argument) {
        console.log(command + ',' + argument);
    }
