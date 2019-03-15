// LIRI, Language Interpretation and Recognition Interface, by Wilder Molyneux, 12/12/18

// Read and set environment variables with dotenv package -- requires CLI: "npm install dotenv" as a prereq
require("dotenv").config();

// Import keys.js, which contains API keys
let keys = require("./keys.js");

// Require node-spotify-api package -- requires CLI: "npm install node-spotify-api" as a prereq to creating a Spotify object
let Spotify = require("node-spotify-api");

// Use Request to grab data from the OMDB API and the Bands In Town API -- requires CLI: "npm install request" as a prereq
let request = require("request");

// Use Moment, a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates -- requires CLI: "npm install moment"
let moment = require("moment");

// File system used for reading and writing files
let fs = require("fs");

// Keys access for Spotify
let spotify = new Spotify(keys.spotify);

// Key access for OMDB
let OMDB = keys.OMDB;

// Key access for Bands in Town
let bandsInTown = keys.BandsInTown

// Testing
// console.log(keys.spotify);
// console.log(spotify);

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
            movieThis(searchTerm);
            console.log("movie-this called");
            break;
        
        case "do-what-it-says":
            doWhatItSays();
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

    // Reference: http://www.artists.bandsintown.com/bandsintown-api

    // Set up function variables
    let eventsQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsInTown.id; 

    // Testing
    console.log("Artist: " + artist);
    console.log("Querying API...");
    
    request(eventsQuery, function (error, response, body) {

        console.log("error: ", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received

        // Review results
        let theResults = [];
        theResults = JSON.parse(body);

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

// Movie This function -- handle movie-this queries
// Assumption: the searchTerm global variable is valid and has already been validated by program entry
function movieThis(movie) {

    // As per given instructions, set movie to "Mr. Nobody" if null
    if(!movie) {
        movie = "Mr. Nobody";
    }

    let queryURL = "http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=" + OMDB.id;

    // Use Request npm package to query the OMDB API
    request(queryURL, function(error, response, body) {

        // Checks to see if there is an error on the request/response; If no error, retrieve requested data
        if (!error && response.statusCode === 200) {
            console.log("-------- Movie Info -----------");
            console.log("Movie Title:  " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year); 
            console.log("Country:      " + JSON.parse(body).Country);
            console.log("Language:     " + JSON.parse(body).Language);
            console.log("Actors:       " + JSON.parse(body).Actors);
            console.log("Plot:         " + JSON.parse(body).Plot); 
            console.log("-------------------------------");
        } else {
          console.log("Error :" + error);
          return;
        }
      });
} // end movieThis function

// Do What It Says function -- handle do-what-it-says queries
// Assumption: a random.txt file has been written to contain a LIRI command and an argument
function doWhatItSays() {

    // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
    // It will run `spotify-this-song` for "I Want it That Way" as defaulted in the file `random.txt`

    fs.readFile("random.txt", "utf8", function(err,data) {

        if (err) {
            console.log("This is an error reading the file random.txt...");

        } else {
            let randomText = data.split(",")
            let command = randomText[0].toLowerCase();
            let commandItem = randomText[1];
    
            if (command === "concert-this") {
                concertThis(commandItem);

            } else if (command === "spotify-this-song") {
                spotifyThisSong(commandItem);

            } else if (command === "movie-this") {
                movieThis(commandItem);
            }
        }
    });
} // end doWhatItSays function
