// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  console.log(req.params.date);

  let time = 0;
  let timeString = "";
  
  let dValue = req.params.date;
  if (dValue == undefined)
  {
    let current = new Date();
    time = current.valueOf();
    timeString = current.toUTCString();
  }
  else
  {
    let date = new Date(dValue);
    if (date.toUTCString() == "Invalid Date")
    {
      let dDate = new Date(Number(dValue));
      if (dDate.toUTCString() == "Invalid Date")
      {
        console.log({ error : "Invalid Date" });
        res.json({ error : "Invalid Date" });
        return;
      }

      time = dDate.valueOf();
      timeString = dDate.toUTCString();
    }
    else 
    {
      time = date.valueOf();
      timeString = date.toUTCString();
    }
  }
  
  console.log({unix: time, utc: timeString});
  res.json({unix: time, utc: timeString});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
