var axios = require('axios');

var coinbase = {
    authorize_user: function authorize_user() {
        
        // var encodedURI = window.encodeURI(`https://www.coinbase.com/oauth/authorize?client_id=${process.env.COINBASE_CLIENT_ID}&redirect_uri=${process.env.COINBASE_CALLBACK}&response_type=code`);
        // console.log('encoded uri', encodedURI);
        
        // var encodedURI = window.encodeURI('https://www.coinbase.com/oauth/authorize?client_id=25e8fd7b1e19d877903dc36fd4027fdb2594941a1c351899dfe1b44c22c00a7b&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=wallet%3Auser%3Aread');

        // var encodedURI = window.encodeURI('https://www.google.com/');
        // console.log('encoded uri', encodedURI);
        
        // return axios.get(encodedURI)
        window.open('https://www.coinbase.com/oauth/authorize?client_id=25e8fd7b1e19d877903dc36fd4027fdb2594941a1c351899dfe1b44c22c00a7b&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=wallet%3Auser%3Aread')

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