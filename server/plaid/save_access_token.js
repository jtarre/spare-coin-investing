
var save_access_token = function save_access_token(app) {
    // PUBLIC_TOKEN, client, ACCESS_TOKEN, and ITEM_ID 
    // can all be found in server/index.js (main server file)
    app.post('/save_access_token', function(request, response, next) {
        // TODO: save Access token, item id
        // don't need to store the bank name because the item id will return that
        // i could be wrong though...
        
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
            
            ACCESS_TOKEN = tokenResponse.access_token;
            ITEM_ID = tokenResponse.item_id;
            console.log('Access Token: ' + ACCESS_TOKEN);
            console.log('Item ID: ' + ITEM_ID);
            response.json({
                'error': false
            });
        });
    });
}

module.exports = save_access_token;