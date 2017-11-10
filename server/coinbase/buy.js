var Client = require('coinbase').Client; 

var buy = function buy(app) {
    app.get('/buy', function(request, response) {
        console.log('access token...\n', COINBASE_ACCESS_TOKEN);
        console.log('refresh token...\n', COINBASE_REFRESH_TOKEN);
        var client = new Client( {
            'accessToken': COINBASE_ACCESS_TOKEN, 
            'refreshToken': COINBASE_REFRESH_TOKEN
        });
        
        // console.log('coinbase client...\n', client);
        // client.getAccount('primary', function(err, account) {
        //     if(err != null) console.error(err);
        //     console.log('coinbase primary account...\n', account);
        // });
        // client.getPaymentMethods(function(err, paymentMethods) {
        //     if(err != null) console.error(err);
        //     console.log(paymentMethods);
        // });
        
        client.getAccounts({}, function(err, accounts) {
            accounts.forEach(function(acct) {
                console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
            });
        });

        // client.getAccount('primary', function(err, account) {
        //     account.buy({'amount': 1, 'currency': 'USD' }, function(err, buy) {
        //         console.log(buy); // would need the 1 to be the loose change amount
        //     })
        // })
        response.json({'status': 200, 'message': 'successs!'});
            
    });
}

module.exports = buy;