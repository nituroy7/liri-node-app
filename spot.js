// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
var request = require("request");

var artist = process.argv[3];

var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";


request(queryURL, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        console.log(JSON.parse(body));


    }
});
