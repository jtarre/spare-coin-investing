var axios = require('axios');

module.exports = {
    authorize_user: function () {
        var encodedURI = window.encodeURI('https://www.coinbase.com/oauth/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&state=SECURE_RANDOM&scope=wallet:accounts:read');
        
        return axios.get(encodedURI)
            // todo: handle success condition - Account connected
            // todo: handle error conditions - Connection failed
            .then(function(response) {
                console.log(response);
            })
    }
}