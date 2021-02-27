const experss = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const _=require("lodash");
const app = experss();

app.use(bodyParser.urlencoded({extended: true}));//When we want to pass the data that comes in the html form
app.get("/", function(req,res){
    res.sendFile(__dirname +"/index.html");
});
 app.post("/",(req, res) => {
         const city = null; 
         city = _.lowerCase(req.body.CityName);
         const country = null;
         country = _.lowerCase(req.body.CountryName);
         const appid= null;//it would be the api key of openweathermap
         if ((city == null || country == null) || (city == null && country == null)) {
             res.redirect('/');
         }



         Promise.all([
             fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&unit=metric`),
             fetch(`https://api.covid19api.com/country/${country}/status/confirmed`)
         ]).then(function (responses) {
             // Get a JSON object from each of the responses
             return Promise.all(responses.map(function (response) {
                 return response.json();
             }));
         }).then(function (data) {
             // Log the data to the console
             // You would do something with both sets of data here
             res.write(`The temperature of the ${city}is${data[0]}and covid cases are${data[1]}in ${country}in last 24 hrs`);
             console.log(data);
             res.send();
         }).catch(function (error) {
             // if there's an error, log it
             console.log(error);
         });


     });

const port=3000||process.env.PORT;
app.listen(port,function(){
    console.log("Server is running on the port 8080");
  })