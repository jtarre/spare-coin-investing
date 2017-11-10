var axios = require('axios');

var access_token_redirect = function access_token_redirect(app) {
    app.get(`/coinbase/oauth/access_token_redirect`, function(request, response) {
        //todo: try catch?
        if(request.access_token) 
            COINBASE_ACCESS_TOKEN = request.access_token;
        else 
            console.error('Failed to save coinbase access token...');
        
        if(request.refresh_token) 
            COINBASE_REFRESH_TOKEN = request.refresh_token;
        else 
            console.error('Failed to save coinbase refresh token...');
        
        response.json({ 
            response: 'completed', 
            access_token: COINBASE_ACCESS_TOKEN, 
            refresh_token: COINBASE_REFRESH_TOKEN
        });
    })
}

module.exports = access_token_redirect;