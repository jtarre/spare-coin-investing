var plaid = require('plaid');

var save_access_token = function save_access_token(app) {
    
    app.use(function(req, res, next) { 
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    // PUBLIC_TOKEN, client, ACCESS_TOKEN, and ITEM_ID 
    // can all be found in server/index.js (main server file)
    app.post('/save_access_token', function(request, response, next) {
        // TODO: save Access token, item id
        // don't need to store the bank name because the item id will return that
        // i could be wrong though...
        
        console.log(request); // may not be in the "body" from axios
        PLAID_PUBLIC_TOKEN = request.body.public_token;
        PLAID_CLIENT.exchangePublicToken(PLAID_PUBLIC_TOKEN, function(error, tokenResponse) {
            if (error != null) {
                var msg = 'Could not exchange public_token!';
                console.log(msg + '\n' + error);
                return response.json({
                    error: msg
                });
            }
            
            PLAID_ACCESS_TOKEN = tokenResponse.access_token;
            PLAID_ITEM_ID = tokenResponse.item_id;
            console.log('Access Token: ' + PLAID_ACCESS_TOKEN);
            console.log('Item ID: ' + PLAID_ITEM_ID);
            response.json({
                'error': false
            });
        });
    });
}

module.exports = save_access_token;