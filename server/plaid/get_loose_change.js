var moment = require('moment');
var calculate_loose_change = require('../helpers/calculate_loose_change');

var get_loose_change = function get_loose_change(app) {
    app.post('/get_loose_change', function(request, response, next) {
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD');
        
        // PLAID_CLIENT and PLAID_ACCESS_TOKEN defined in server/index.js
        PLAID_CLIENT.getTransactions(PLAID_ACCESS_TOKEN, startDate, endDate, {
            count: 250,
            offset: 0,
        }, function(error, transactionsResponse) {
            console.log('transactions response portion...');
            if (error != null) {
                console.log(JSON.stringify(error));
                return error;
            }
            var transactions = transactionsResponse && transactionsResponse
            && transactionsResponse.transactions 
            ? transactionsResponse.transactions : [];
            
            console.log('calculate loose change...\n', calculate_loose_change);
            var change = transactions.length > 0 ? calculate_loose_change(transactions) : 0;
            console.log('change...', change);
            response.json({ change: change });
        });
    });
}

module.exports = get_loose_change;