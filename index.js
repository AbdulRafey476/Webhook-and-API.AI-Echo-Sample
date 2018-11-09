"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");
var NodeGeocoder = require('node-geocoder');

const now = new Date()

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// restService.use(bodyParser.json());
// Request.get(`http://api.aladhan.com/v1/calendar?latitude=24.8667795&longitude=67.0311286&method=2&month=${now.getMonth()}&year=${now.getFullYear()}`, (err, response, body) => {
//   if (err) throw err;
//   var data = JSON.parse(body)
//   var timing = data.data[0].timings

// });


// restService.post("/times", function (req, res) {
//   if (req.body.result.parameters.PrayerTime.toLowerCase() === "time") {
//   }
// });

restService.post("/echo", function (req, res) {
  var speech =
    req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.PrayerTime
      ? req.body.result.parameters.PrayerTime
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

// https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening 8000");
});
