"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");
const PORT = process.env.PORT || 8000;

const now = new Date()

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/echo", function (req, res) {
  if (req.body.result.parameters.PrayerTime === "Time" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${now.getMonth() + 1}&year=${now.getFullYear()}`, (err, response, body) => {
      if (err) throw err;
      else {
        var data = JSON.parse(body)
        var timing;
        for (var i = 0; i < data.data.length; i++) {
          var apiDate = data.data[i].date.readable
          if (apiDate.slice(0, 2) === day.slice(8)) {
            timing = data.data[i].timings
          }
        }
        var str = `<speak> (${day}) Fajar time is ${timing.Fajr}, <break time="1s"/> Dhuhr time is ${timing.Dhuhr}, <break time="1s"/> Asaar time is ${timing.Asr}, <break time="1s"/> Maghrib time is ${timing.Maghrib} <break time="1s"/> and Esha time is ${timing.Isha}</speak>`;
        var disStr = `(${day}) Fajar time is ${timing.Fajr}, Dhuhr time is ${timing.Dhuhr}, Asaar time is ${timing.Asr}, Maghrib time is ${timing.Maghrib} and Esha time is ${timing.Isha}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.PrayerNames === "Fajar" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${now.getMonth() + 1}&year=${now.getFullYear()}`, (err, response, body) => {
      if (err) throw err;
      else {
        var data = JSON.parse(body)
        var timing;
        for (var i = 0; i < data.data.length; i++) {
          var apiDate = data.data[i].date.readable
          if (apiDate.slice(0, 2) === day.slice(8)) {
            timing = data.data[i].timings
          }
        }
        var str = `<speak>Fajar time is ${timing.Fajr}</speak>`;
        var disStr = `Fajar time is ${timing.Fajr}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.PrayerNames === "Dhuhr" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${now.getMonth() + 1}&year=${now.getFullYear()}`, (err, response, body) => {
      if (err) throw err;
      else {
        var data = JSON.parse(body)
        var timing;
        for (var i = 0; i < data.data.length; i++) {
          var apiDate = data.data[i].date.readable
          if (apiDate.slice(0, 2) === day.slice(8)) {
            timing = data.data[i].timings
          }
        }
        var str = `<speak>Dhuhr time is ${timing.Dhuhr}</speak>`;
        var disStr = `Dhuhr time is ${timing.Dhuhr}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.PrayerNames === "Asaar" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${now.getMonth() + 1}&year=${now.getFullYear()}`, (err, response, body) => {
      if (err) throw err;
      else {
        var data = JSON.parse(body)
        var timing;
        for (var i = 0; i < data.data.length; i++) {
          var apiDate = data.data[i].date.readable
          if (apiDate.slice(0, 2) === day.slice(8)) {
            timing = data.data[i].timings
          }
        }
        var str = `<speak>Asaar time is ${timing.Asr}</speak>`;
        var disStr = `Asaar time is ${timing.Asr}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.PrayerNames === "Maghrib" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${now.getUTCMonth() + 1}&year=${now.getUTCFullYear()}`, (err, response, body) => {
      if (err) throw err;
      else {
        var data = JSON.parse(body)
        var timing;
        for (var i = 0; i < data.data.length; i++) {
          var apiDate = data.data[i].date.readable
          if (apiDate.slice(0, 2) === day.slice(8)) {
            timing = data.data[i].timings
          }
        }
        var str = `<speak>Maghrib time is ${timing.Maghrib}</speak>`;
        var disStr = `Maghrib time is ${timing.Maghrib}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.PrayerNames === "Esha" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${now.getUTCMonth() + 1}&year=${now.getUTCFullYear()}`, (err, response, body) => {
      if (err) throw err;
      else {
        var data = JSON.parse(body)
        var timing;
        for (var i = 0; i < data.data.length; i++) {
          var apiDate = data.data[i].date.readable
          if (apiDate.slice(0, 2) === day.slice(8)) {
            timing = data.data[i].timings
          }
        }
        var str = `<speak>Isha time is ${timing.Isha}</speak>`;
        var disStr = `Esha time is ${timing.Isha}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }
});

restService.listen(PORT, function () {
  console.log("Server up and listening 8000");
});
