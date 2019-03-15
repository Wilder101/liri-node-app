# liri-node-app
### LIRI is a Language Interpretation and Recognition Interface.

## About:
LIRI is a Node.js command line interface (CLI) application that can be instructed to execute a command to search Bands in Town, Spotify, and the Open Movie Database (OMDB) via three separate web APIs. Before you attempt to use LIRI, ensure that you have installed Node.js on your computer. Also, you will need to obtain your own API keys for Bands In Town, Spotify, and the OMDB. Instructions for where to place those keys are found below. Lastly, you need to understand which commands LIRI can accept (before you get creative and augment the program).

## Commands:
There are four commands available for use. On the command line, they can be used in the following generic format: 
$  node liri.js <command> <"your search term">

The commands available are as follows:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

The search term you choose will depend on which command you give LIRI. For example, if you hope to see a concert performed by Tenacous D, your search term would be "Tenacous D." Similarly, if the name of a song or movie you desire to learn more about, you might use search terms of "Ob-La-Di, Ob-La-Da" or "Citizen Kane" for the respective search. Be sure to actually include a term to search for in order to not recieve a console logged error or a programmatic default value term.


