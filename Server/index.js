// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();

const fetch = require("cross-fetch");

app.use(express.json());

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})

// No static server or /public because this server
// is only for AJAX requests
app.post("/query/getWaterData", async function(req, res){
  console.log("Handling Post request in query/getWaterData");
  console.log(req.body);
  let result = await lookUpWater(req.body);
  console.log("In post:",result);
  res.json(result);
})
// respond to all AJAX querires with this message
// app.use(function(req, res, next) {
//   req.json({msg: "No such AJAX request"})
// });

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

async function lookUpWater(obj) {
  console.log("lookUpWater", obj);
  let year = obj["year"];
  let month = obj["month"];
  const api_url = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,DNP,BER&SensorNums=15&dur_code=M&Start=${year}-${month}-01&End=${year}-${month}-02`;
  let fetch_response = await fetch(api_url);
  let JSON = await fetch_response.json();
  let waterLevel = [];
  for(let i = 0; i<7;i++){
    waterLevel.push(JSON[i]["value"]);
  }
  console.log("in lookUpWater:",waterLevel);
  return waterLevel;
}