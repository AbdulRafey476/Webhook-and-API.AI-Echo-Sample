"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/pray", function (req, res) {
  if (req.body.result.parameters.PrayCall === "Azan") {
    var speech = '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>'
  }
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

// https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
