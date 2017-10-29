var axios = require('axios');

var get_access_token = function get_access_token(app) {
    var dev = process.env.APP_LOCAL == 'local' ? ':8081' : "";
    app.get(`/coinbase/oauth/get_access_token`, function(request, response) {
        //todo: try catch?
        if(request.access_token) COINBASE_ACCESS_TOKEN = request.access_token;
        else console.error('Failed to save coinbase access token...');
        
        if(request.refresh_token) COINBASE_REFRESH_TOKEN = request.refresh_token;
        else console.error('Failed to save coinbase refresh token...');
        response.json({response: 'completed'});
    })
}

module.exports = get_access_token;