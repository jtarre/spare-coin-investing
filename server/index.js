/*
 *
 * Ok, design
 * san serif font
 * mvp
 * no database
 * walk through form
 * like typescript
 * step 1. authorize bank account
 * step 2. authorize coinbase
 * step 3. get value of loose change
 * step 3a. print value of loose change
 * 3a1. congrats, you have some loose change! 
 * 4. make purchase
 * 4a. Buy {loose_change} worth of bitcoin!
 */

/*
 * Possible start up errors:
 * client fails - (move into its own method to unit test it?)
 */

var dotenv = require('dotenv').config({path: './.env.server'});
var express = require('express');
var bodyParser = require('body-parser');

var coinbase = require('coinbase');
var plaid = require('plaid');

var axios = require('axios');
var moment = require('moment');

var APP_PORT = process.env.APP_PORT;

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

/* Coinbase */
var COINBASE_CODE = null;
var COINBASE_ACCESS_TOKEN = null;
var COINBASE_REFRESH_TOKEN = null;

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

require('./plaid/save_access_token')(app);
require('./plaid/get_access_token')(app);
require('./plaid/get_transactions')(app);
require('./plaid/get_loose_change')(app);

require('./coinbase/auth_user_redirect')(app);
require('./coinbase/get_access_token')(app);


console.log('Hello!');
console.log(moment());
var server = app.listen(APP_PORT, function() {
  console.log('spare-coin-investing server listening on port ' + APP_PORT);
});