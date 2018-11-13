"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");

const now = new Date()

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/echo", function (req, res) {
  if (req.body.result.parameters.PrayerTime === "Time") {
    Request.get(`https://ipapi.co/json`, (err, response, loc) => {
      if (err) throw err;
      else {
        var location = JSON.parse(loc)
        Request.get(`http://api.aladhan.com/v1/calendar?latitude=${location.latitude}&longitude=${location.longitude}&method=2&month=${now.getMonth()}&year=${now.getFullYear()}`, (err, response, body) => {
          if (err) throw err;
          else {
            var data = JSON.parse(body)
            var timing = data.data[0].timings
            var str = `<speak>Fajar time is ${timing.Fajr}, <break time="1s"/> Dhuhr time is ${timing.Dhuhr}, <break time="1s"/> Asar time is ${timing.Asr}, <break time="1s"/> Maghrib time is ${timing.Maghrib} <break time="1s"/> and Esha time is${timing.Isha}</speak>`;
            var disStr = `Fajar time is ${timing.Fajr}, Dhuhr time is ${timing.Dhuhr}, Aasar time is ${timing.Asr}, Maghrib time is ${timing.Maghrib} and Esha time is${timing.Isha}`;
            return res.json({
              speech: str,
              displayText: disStr,
              source: "webhook-echo-sample"
            });
          }
        });
      }
    });
  }
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening 8000");
});
