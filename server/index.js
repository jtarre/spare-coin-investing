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

// TODO: Send client to home page if route not found...

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
PLAID_ACCESS_TOKEN = null;
PLAID_PUBLIC_TOKEN = null;
PLAID_ITEM_ID = null;

// Initialize the Plaid client
PLAID_CLIENT = new plaid.Client(
    process.env.PLAID_CLIENT_ID,
    process.env.PLAID_SECRET,
    process.env.PLAID_PUBLIC_KEY,
    plaid.environments[process.env.PLAID_ENV]
);

// Coinbase fields needed to create oauth2 client
COINBASE_CODE = null;
COINBASE_ACCESS_TOKEN = null;
COINBASE_REFRESH_TOKEN = null;

var app = express();
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// allows cross origin requests 
// on C9 dev environment, dev client is at port 8080, server is at port 8081.
// because the server is a different origin than client
// requires that cross origin requests are active
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

require('./coinbase/auth_redirect')(app);
require('./coinbase/access_token_redirect')(app);
require('./coinbase/buy')(app);

console.log('Hello!');
console.log(moment());
var server = app.listen(APP_PORT, function() {
  console.log('spare-coin-investing server listening on port ' + APP_PORT);
});