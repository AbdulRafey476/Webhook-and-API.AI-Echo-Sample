"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");
const PORT = process.env.PORT || 8000;
const functions = require('firebase-functions');
const DialogflowApp = require('actions-on-google').DialogflowApp;

var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDENTQQ3_TMvzF8nKTj59Ocxql-f1nRT4k",
  authDomain: "prayercall-1d584.firebaseapp.com",
  databaseURL: "https://prayercall-1d584.firebaseio.com",
  projectId: "prayercall-1d584",
  storageBucket: "prayercall-1d584.appspot.com",
  messagingSenderId: "1052788735460"
};
firebase.initializeApp(config);


var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prayercall-1d584.firebaseio.com"
});


const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

  const requestPermission = (app) => {
    app.askForPermission('To locate you', app.SupportedPermissions.DEVICE_PRECISE_LOCATION);
  };

  const userInfo = (app) => {
    if (app.isPermissionGranted()) {
      const address = app.getDeviceLocation().address;
      if (address) {
        app.tell(`You are at ${address}`);
      }
      else {
        // Note: Currently, precise locaton only returns lat/lng coordinates on phones and lat/lng coordinates 
        // and a geocoded address on voice-activated speakers. 
        // Coarse location only works on voice-activated speakers.
        app.tell('Sorry, I could not figure out where you are.');
      }
    } else {
      app.tell('Sorry, I could not figure out where you are.');
    }
  };

  const app = new DialogflowApp({ request, response });
  const actions = new Map();
  actions.set('request_permission', requestPermission);
  actions.set('user_info', userInfo);
  app.handleRequest(actions);

});


restService.post("/", function (req, res) {

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
