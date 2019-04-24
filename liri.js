require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);




var moment = require('moment');

var request = process.argv[2];

var guideline = process.argv.slice(3);

var fs = require("fs");


switch (request) {
  case "concert-this":
    concerts(guideline);
    break;
  
  case "spotify-this-song":
    spotifySong(guideline);
    break;
  
  case "movie-this":
    laMovie(guideline);
    break;
  
  case "do-what-it-says":
    question(guideline);
    break;
  default:
    
   
  
}

function concerts(guideline) {

  var queryUrl = "https://rest.bandsintown.com/artists/" + guideline + "/events?app_id=codingbootcamp";

  console.log(queryUrl);

  axios.get(queryUrl).then(function(response) {
    console.log("Venue:  " + response.data[1].venue.name);
    console.log("Location:  " + (response.data[1].venue.city) + ", " + (response.data[1].venue.country));
    console.log("Date:  " + moment(response.data[1].datetime).format('MM/DD/YYYY'));

  })

};

function spotifySong(songName) {
 

  if (!songName) {
    songName = "The Sign";
  };
  
  console.log(songName);

  spotify.search({
    type: 'track',
    query: songName
  }).then(function (response) {
    console.log("Title: " + response.tracks.items[0].name);
    console.log("Artist: " + response.tracks.items[0].artists[0].name);
    console.log("Link: " + response.tacks.items[0].external_urls.spotify);
    console.log("Album: " + response.track.items[0].album.name);
  }) 
  .catch(function (err) {
    console.log(err);
  });

}
  

function laMovie(movieName) {

  if (!movieName) {
    movieName = "Mr. Nobody";
    }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

   console.log(queryUrl);

    axios.get(queryUrl).then(
    function (response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB rating: " + response.data.imdbRating);
      console.log("Metascore: " + response.data.Metascore);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
  )
}

function question() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
   

    var dataArr = data.split(",");
    
    var request = dataArr[0];
    var guideline = dataArr[1];

      switch (request) {
       case "concert-this":
        concerts(guideline);
        break;
      case "spotify-this-song":
        spotifySong(guideline)
        break;
      case "movie-this":
        laMovie(guideline);
        break;
  

    };
  })
}

