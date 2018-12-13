// LIRI, Language Interpretation and Recognition Interface, by Wilder Molyneux, 12/12/18

// Read and set environment variables with dotenv package -- requires CLI: "npm install dotenv" as a prereq
require("dotenv").config();

// Import keys.js, which contains API keys
let keys = require("./keys.js");

// Require node-spotify-api package -- requires CLI: "npm install --save node-spotify-api" as a prereq to creating a Spotify object
let Spotify = require("node-spotify-api");

// Use Request to grab data from the OMDB API and the Bands In Town API -- requires CLI: "npm install requrest" as a prereq

// Use Moment, a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates -- requires CLI: "npm i moment"

// Keys access 
var spotify = new Spotify(keys.spotify);

// Testing
console.log(keys.spotify);
console.log(spotify);

// Take in a command (ex: concert-this, spotify-this-song, movie-this, do-what-it-says)
let command = process.argv[2];

// Take in a serch term (ex: artist/band name, song name)
let searchTerm = process.argv[3];

// Check for valid program arguments and proceed
if (command !== undefined && searchTerm !== undefined) {

    // Show entry success
    console.log("Valid arguments have been received.")
    console.log("Command: " + command);
    console.log("Term: " + searchTerm);

    // Determin which API to use
    switch (command) {

        case "concert-this":
            //   total();
            console.log("concert-this called");
            break;
        
        case "spotify-this-song":
            //   deposit();
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
