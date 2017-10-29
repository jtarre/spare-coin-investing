var moment = require('moment');

var loose_change = function loose_change(app) {
    app.post('/loose_change', function(request, response, next) {
        var get_loose_change = get_loose_change.bind(this, response);
        console.log('get change binding...\n', get_loose_change);
        get_loose_change();
    });
    
    function get_loose_change(response) {
        // Pull transactions for the Item for the last 30 days
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD');
        var transactionResponse = transactionResponse.bind(this, response);
        client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
            count: 250,
            offset: 0,
        }, transactionResponse);
    }
    
    function transactionResponse (error, transactionsResponse, response) {
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
    
        
    } 
    
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

module.exports = loose_change;