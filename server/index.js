var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var plaid = require('plaid');
var dotenv = require('dotenv').config({path: './.env.server'});

var APP_PORT = process.env.APP_PORT;
console.log('client id...', process.env.PLAID_CLIENT_ID);
console.log('public key...', process.env.PLAID_PUBLIC_KEY);

var PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
var PLAID_SECRET = process.env.PLAID_SECRET;
var PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
var PLAID_ENV = process.env.PLAID_ENV;

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);
console.log('plaid client...\n', client);

var app = express();
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(request, response, next) {
  console.log('Welcome home!');
  response.send('You made it');
  // response.render('index.ejs', {
  //   PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
  //   PLAID_ENV: PLAID_ENV,
  // });
});

app.post('/save_access_token', function(request, response, next) {
  console.log(request); // may not be in the "body" from axios
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      var msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + error);
      return response.json({
        error: msg
      });
    }

    // TODO: save Access token, item id
    // don't need to store the bank name because the item id will return that
    // i could be wrong though...

    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    response.json({
      'error': false
    });
  });
});

app.get('/get_access_token', function(req, res) {
    res.json({
        access_token: ACCESS_TOKEN
    });
});

app.post('/set_recurring_purchase', function(req, res) {
  // TODO: set this fucker up

  // this is a save to firebase. 
  // this isn't actually a purchase on coinbase or a plaid call. 

  // i don't actually know how this will look
  // do i run a cron job that runs every day and checks for jobs that should run
  // do i set up a background job to go off at a specific time for each purchase?

});

console.log('Hello!');
var server = app.listen(APP_PORT, function() {
  console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});