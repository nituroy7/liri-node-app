// Include the request npm package 
var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {

        movieName = movieName + "+" + nodeArgs[i];

    } else {

        movieName += nodeArgs[i];

    }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

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
