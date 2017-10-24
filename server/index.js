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

app.post('/transactions', function(request, response, next) {
  // Pull transactions for the Item for the last 30 days
  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0,
  }, function(error, transactionsResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({
        error: error
      });
    }
    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
    response.json(transactionsResponse);
  });
});

app.post('/loose_change', function(request, response, next) {
    var get_change = get_loose_change.bind(this, response);
    console.log('get change binding...\n', get_change);
    var change = get_change();

    function get_loose_change(response) {
        // Pull transactions for the Item for the last 30 days
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD');
        client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
            count: 250,
            offset: 0,
        }, transactionResponse);

        function transactionResponse (error, transactionsResponse) {
            if (error != null) {
                console.log(JSON.stringify(error));
                return error;
                // return response.json({
                //     error: error
                // });
            }
            var transactions = transactionsResponse && transactionsResponse
                && transactionsResponse.transactions 
                ? transactionsResponse.transactions : [];

            var change = transactions.length > 0 ? get_change(transactions) : 0;
            console.log('change...', change);
            response.json({ change: change });
        }

        function get_change(transactions) {
            var change = transactions
                .map(get_transaction_value)
                .map(get_transaction_change)
                .reduce(sum, 0);
            var changeRound = Math.round(change * 100) / 100; // keep to two decimals
            return changeRound;

            function get_transaction_value(transaction) {
                return transaction.amount;
            }

            function get_transaction_change(transaction_amount) {
                var cents = transaction_amount - Math.floor(transaction_amount);
                if(cents != 0) return 1 - cents;
                else return 0;
            }

            function sum(transaction_amount, sum) {
                return sum += transaction_amount;
            }
        }
    }
});

console.log('Hello!');
console.log(moment());
var server = app.listen(APP_PORT, function() {
  console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});