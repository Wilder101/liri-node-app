// LIRI, Language Interpretation and Recognition Interface, by Wilder Molyneux, 12/12/18

// Read and set environment variables with dotenv package -- requires CLI: "npm install dotenv" as a prereq
require("dotenv").config();

// Import keys.js, which contains API keys
let keys = require("./keys.js");

// Require node-spotify-api package -- requires CLI: "npm install node-spotify-api" as a prereq to creating a Spotify object
let Spotify = require("node-spotify-api");

// Use Request to grab data from the OMDB API and the Bands In Town API -- requires CLI: "npm install request" as a prereq
var request = require("request");

// Use Moment, a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates -- requires CLI: "npm install moment"
var moment = require("moment");

// Future addition as a bonus: log results to a log.txt file
// File system used for writing logs
// let fs = require("file-system");

// Keys access for Spotify
var spotify = new Spotify(keys.spotify);

// Testing
console.log(keys.spotify);
console.log(spotify);

// Take in a command (ex: concert-this, spotify-this-song, movie-this, do-what-it-says)
let command = process.argv[2];

// Take in a serch term (ex: artist/band name, song name)
let searchTerm = process.argv.slice(3).join(" ");

// Check for valid program arguments and proceed -- example on CLI: 'node liri.js concert-this "Van Halen"'
if (command !== undefined && searchTerm !== undefined) {

    // Show entry success
    console.log("Valid arguments have been received.")
    console.log("Command: " + command);
    console.log("Term: " + searchTerm);

    // Determine which API to use
    switch (command) {

        case "concert-this":
            concertThis(searchTerm);
            console.log("concert-this called");
            break;
        
        case "spotify-this-song":
            spotifyThisSong(searchTerm);
            console.log("spotify-this-song called");
            break;
        
        case "movie-this":
            // withdraw();
            console.log("movie-this called");
            break;
        
        case "do-what-it-says":
            // lotto();
            console.log("do-what-it-says called");
            break;

        default:
            console.log('"' + command + '"' + " is not a valid command.");
    
    } // End switch statement

} else {    // Program arguments were not existant or not valid

    console.log("Sorry. A command and search term are required. You provided: ");
    console.log("Command: " + command);
    console.log("Term: " + searchTerm);
}

// Concert-this function -- handle concert-this queries
// Assumption: the searchTerm global variable is valid and has already been validated by program entry
function concertThis(artist) {

    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")

    // Reference: http://www.artists.bandsintown.com/bandsintown-api

    // Testing
    // let artist = searchTerm;
    // let artist = "Tenacious D";

        // Set up function variables
    let eventsQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // Testing
    console.log("Artist: " + artist);
    console.log("Querying API...");

    // Tested perfectly: https://rest.bandsintown.com/artists/Tenacious%20D/events?app_id=codingbootcamp
    
    request(eventsQuery, function (error, response, body) {

        console.log("error: ", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received

        // Review results
        let theResults = [];
        theResults = JSON.parse(body);

        // Testing
        // console.log(response[0].venue.name);
        // console.log(JSON.stringify(response.body));
        // console.log(JSON.parse(response.body));
        // console.log(JSON.parse(body));

        console.log("\n" + "Upcoming events for " + artist + ":");
        console.log("---------------------------------");

        for (let i = 0; i < theResults.length; i ++) {

            console.log("Venue:    " + theResults[i].venue.name);
            console.log("Location: " + theResults[i].venue.city + ", " + theResults[i].venue.region);
            console.log("          " + theResults[i].venue.country);
            console.log("Date:     " + moment(theResults[i].datetime.substring(0,10)).format("MM/DD/YYYY"));
            console.log("---------------------------------");
        }

        console.log("");
    }); // End request
} // end concertThis function

// Spotify this Song function -- handle spotify-this-song queries
// Assumption: the searchTerm global variable is valid and has already been validated by program entry
function spotifyThisSong(song) {

    // Call Spotify API with prepopulated Spotify ID and Secret password
    spotify.search({ type: "track", query: song}, function(err, data) {
        
        if (err) {
            return console.log("Spotify error occurred: " + err);
        }
    
        console.log("---------------------------------"); 
        console.log("Song:         " + data.tracks.items[0].name); 
        console.log("Artist:       " + data.tracks.items[0].artists[0].name); 
        console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify); 
        console.log("Album:        " + data.tracks.items[0].album.name); 
        console.log("---------------------------------"); 
    });

} // end spotifyThisSong function


