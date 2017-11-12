var config = require('../../config');
var authorize_user = function authorize_user() {
    // todo: make redirect_uri dependent on production or development
    // set coinbase scopes
    var scope = encodeURIComponent(`${process.env.COINBASE_SCOPE}`);
    var redirect_uri = encodeURIComponent(`${config.server_url}/${process.env.COINBASE_AUTH_REDIRECT}`);
    var client_id = encodeURIComponent(`${process.env.COINBASE_CLIENT_ID}`);;
    window.location.assign(`https://www.coinbase.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`);
    }

module.exports = authorize_user;