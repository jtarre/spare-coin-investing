var axios = require('axios');

module.exports = {
    authorize_user: function () {
        var encodedURI = window.encodeURI(`https://www.coinbase.com/oauth/authorize?client_id=${COINBASE_CLIENT_ID}&redirect_uri=${COINBASE_CALLBACK}&response_type=code`);

        return axios.get(encodedURI)
            // todo: handle success condition - Account connected
            // todo: handle error conditions - Connection failed
            .then(function(response) {
                console.log(response);
            })
    }
}