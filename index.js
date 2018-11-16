"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");
const PORT = process.env.PORT || 8000;
const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
const ApiAiApp = require('actions-on-google').ApiAiApp;

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/echo", function (req, res) {

  const app = new ApiAiApp({ request: req, response: res });
  const intent = app.getIntent();

  switch (intent) {
    case 'input.welcome':
      // you are able to request for multiple permissions at once
      const permissions = [
        app.SupportedPermissions.NAME,
        app.SupportedPermissions.DEVICE_PRECISE_LOCATION
      ];
      app.askForPermissions('Your own reason', permissions);
      break;
    case 'DefaultWelcomeIntent.DefaultWelcomeIntent-fallback':
      if (app.isPermissionGranted()) {
        // permissions granted.
        let displayName = app.getUserName().displayName;

        //NOTE: app.getDeviceLocation().address always return undefined for me. not sure if it is a bug.
        // 			app.getDeviceLocation().coordinates seems to return a correct values
        //			so i have to use node-geocoder to get the address out of the coordinates
        let coordinates = app.getDeviceLocation().address;

        app.tell('Hi ' + app.getUserName().givenName + '! Your address is ' + address);

      } else {
        // permissions are not granted. ask them one by one manually
        app.ask('Alright. Can you tell me you address please?');
      }
      break;
  }




  if (req.body.result.parameters.PrayerTime === "Time" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${day.slice(5, 7)}&year=${day.slice(0, 4)}`, (err, response, body) => {
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

  else if (req.body.result.parameters.FajarPray === "Fajar" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${day.slice(5, 7)}&year=${day.slice(0, 4)}`, (err, response, body) => {
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
        var str = `<speak>(${day}) Fajar time is ${timing.Fajr}</speak>`;
        var disStr = `(${day}) Fajar time is ${timing.Fajr}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.DhuhrPray === "Dhuhr" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${day.slice(5, 7)}&year=${day.slice(0, 4)}`, (err, response, body) => {
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
        var str = `<speak>(${day}) Dhuhr time is ${timing.Dhuhr}</speak>`;
        var disStr = `(${day}) Dhuhr time is ${timing.Dhuhr}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.AsaarPray === "Asaar" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${day.slice(5, 7)}&year=${day.slice(0, 4)}`, (err, response, body) => {
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
        var str = `<speak>(${day}) Asaar time is ${timing.Asr}</speak>`;
        var disStr = `(${day}) Asaar time is ${timing.Asr}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.MaghribPray === "Maghrib" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${day.slice(5, 7)}&year=${day.slice(0, 4)}`, (err, response, body) => {
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
        var str = `<speak>(${day}) Maghrib time is ${timing.Maghrib}</speak>`;
        var disStr = `(${day}) Maghrib time is ${timing.Maghrib}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }

  else if (req.body.result.parameters.EshaPray === "Esha" && req.body.result.parameters.date !== "") {
    var day = req.body.result.parameters.date
    Request.get(`http://api.aladhan.com/v1/calendar?latitude=40.730610&longitude=-73.935242&method=2&month=${day.slice(5, 7)}&year=${day.slice(0, 4)}`, (err, response, body) => {
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
        var str = `<speak>(${day}) Isha time is ${timing.Isha}</speak>`;
        var disStr = `(${day}) Esha time is ${timing.Isha}`;
        return res.json({
          speech: str,
          displayText: disStr,
          source: "Nodejs"
        });
      }
    });
  }
  else {
    return res.json({
      speech: "<speak>Kindly use right format of date (yyyy-mm-dd)</speak>",
      displayText: "Kindly use right format of date (yyyy-mm-dd)",
      source: "Nodejs"
    });
  }
});

restService.listen(PORT, function () {
  console.log("Server up and listening 8000");
});
