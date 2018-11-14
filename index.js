"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");
const geoip = require('geoip-lite');
const ip = require('ip');
const PORT = process.env.PORT || 8000;
const publicIp = require('public-ip');

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
    publicIp.v4().then(function (ip) {
      let geo = geoip.lookup(ip);
      Request.get(`http://api.aladhan.com/v1/calendar?latitude=${geo.ll[0]}&longitude=${geo.ll[1]}&method=2&month=${now.getMonth()}&year=${now.getFullYear()}`, (err, response, body) => {
        if (err) throw err;
        else {
          var data = JSON.parse(body)
          var timing = data.data[0].timings
          var str = `<speak>Fajar time is ${timing.Fajr}, <break time="1s"/> Dhuhr time is ${timing.Dhuhr}, <break time="1s"/> Asaar time is ${timing.Asr}, <break time="1s"/> Maghrib time is ${timing.Maghrib} <break time="1s"/> and Esha time is ${timing.Isha}</speak>`;
          var disStr = `Fajar time is ${timing.Fajr}, Dhuhr time is ${timing.Dhuhr}, Asaar time is ${timing.Asr}, Maghrib time is ${timing.Maghrib} and Esha time is ${timing.Isha}`;
          return res.json({
            speech: str,
            displayText: disStr,
            source: "webhook-echo-sample"
          });
        }
      });
    });
  }
  else if (req.body.result.parameters.PrayerNames === "Fajar") {
    publicIp.v4().then(function (ip) {
      let geo = geoip.lookup(ip);
      Request.get(`http://api.aladhan.com/v1/calendar?latitude=${geo.ll[0]}&longitude=${geo.ll[1]}&method=2&month=${now.getMonth()}&year=${now.getFullYear()}`, (err, response, body) => {
        if (err) throw err;
        else {
          var data = JSON.parse(body)
          var timing = data.data[0].timings
          var str = `<speak>Fajar time is ${timing.Fajr}</speak>`;
          var disStr = `Fajar time is ${timing.Fajr}`;
          return res.json({
            speech: str,
            displayText: disStr,
            source: "webhook-echo-sample"
          });
        }
      });
    });
  }
  else if (req.body.result.parameters.PrayerNames === "Dhuhr") {
    publicIp.v4().then(function (ip) {
      let geo = geoip.lookup(ip);
      Request.get(`http://api.aladhan.com/v1/calendar?latitude=${geo.ll[0]}&longitude=${geo.ll[1]}&method=2&month=${now.getMonth()}&year=${now.getFullYear()}`, (err, response, body) => {
        if (err) throw err;
        else {
          var data = JSON.parse(body)
          var timing = data.data[0].timings
          var str = `<speak>Dhuhr time is ${timing.Dhuhr}</speak>`;
          var disStr = `Dhuhr time is ${timing.Dhuhr}`;
          return res.json({
            speech: str,
            displayText: disStr,
            source: "webhook-echo-sample"
          });
        }
      });
    });
  }
});

restService.listen(PORT, function () {
  console.log("Server up and listening 8000");
});
