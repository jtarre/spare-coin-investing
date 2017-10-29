var buy = function buy(app) {
    app.get('/buy', function(req, res) {
        // 1. get plaid transactions
        // 2. eval plaid transactions for loose change
        // 3. initiate a coinbase buy for that much money
    
        // error condition: not enough money in account
        // coinbase might throw that error
        // if there's a default payment method
    
        // so what do I have to do for plaid transactions
        // 1. get access_token and item_id from database
        // 2. get transactions from plaid
        // 3. var loose_change = calculate loose change from all calculations
        // 4. pass loose_change to coinbase for a purchase
        
    });
}

module.exports = buy;