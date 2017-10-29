var axios = require('axios');
var dotenv = require('dotenv').config({ path: './.env.server' });

var auth_user_redirect = function auth_user_redirect(app) {
    app.get(`/coinbase/oauth/auth_user_redirect`, function(request, response) {
        // todo: check that the url contains the code. 
        // todo: post request for access token
        // todo: get access token and refresh token
        // todo: put scope in appropriate place. 
        var code = request.query.code ? request.query.code : console.error('Failed to retrieve coinbase code');
        var body = { 
            grant_type: 'authorization_code', 
            code: code,
            client_id: process.env.COINBASE_CLIENT_ID,
            client_secret: process.env.COINBASE_CLIENT_SECRET,
            redirect_uri: process.env.COINBASE_ACCESS_TOKEN_REDIRECT
        };
        axios.post('https://api.coinbase.com/oauth/token', body)
        .then(handleResponse)
        .catch(handleError);
    })
        
    function handleResponse(response) {
        console.log('response from coinbase oauth...\n', response);
    }
    
    function handleError(error) {
        console.error('error from coinbase auth...\n', error);
    }
    
}

module.exports = auth_user_redirect;
