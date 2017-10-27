var axios = require('axios');

var coinbase = {
    authorize_user: function authorize_user() {
        
        // todo: include appropriate scope for buying bitcoin
        // todo: make the various uri components environment variables
        window.open('https://www.coinbase.com/oauth/authorize?client_id=25e8fd7b1e19d877903dc36fd4027fdb2594941a1c351899dfe1b44c22c00a7b&redirect_uri=https%3A%2F%2Fspare-coin-investing-jtarre.c9users.io%2Fcoinbase-callback&response_type=code&scope=wallet%3Auser%3Aread');

            // todo: handle success condition - Account connected
            // todo: handle error conditions - Connection failed
            // .then(function(response) {
            //     console.log(response);
            // })
            // .catch(function(error) {
            //     console.error(error);
            // });
    }
}

module.exports = coinbase;