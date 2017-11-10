var axios = require('axios');
var dotenv = require('dotenv').config({ path: './.env.server' });

var auth_redirect = function auth_redirect(app) {
    app.get(`/coinbase/oauth/auth_redirect`, function(request, response) {
        // todo: check that the url contains the coinbase code. 
        // todo: post request for access token
        // todo: get access token and refresh token
        // todo: put scope in appropriate place. 
        COINBASE_CODE = request.query.code;
        var body = { 
            grant_type: 'authorization_code', 
            code: COINBASE_CODE,
            client_id: process.env.COINBASE_CLIENT_ID,
            client_secret: process.env.COINBASE_CLIENT_SECRET,
            redirect_uri: process.env.COINBASE_AUTH_REDIRECT
        };
        axios.post('https://api.coinbase.com/oauth/token', body)
        .then(handleResponse)
        .catch(handleError);
        response.redirect('https://spare-coin-investing-jtarre.c9users.io');
        
        
        
    })
        
    function handleResponse(response) {
        if(response.data.access_token) 
            COINBASE_ACCESS_TOKEN = response.data.access_token;
        else 
            console.error('unable to retrieve access token...');
        
        if(response.data.refresh_token) 
            COINBASE_REFRESH_TOKEN = response.data.refresh_token;
        else 
            console.error('unable to retrieve refresh token...');
        
        console.log({
            access_token: COINBASE_ACCESS_TOKEN, 
            refresh_token: COINBASE_REFRESH_TOKEN
        });
    }
    
    function handleError(error) {
        console.error('error from coinbase auth...\n', error);
    }
}

module.exports = auth_redirect;
