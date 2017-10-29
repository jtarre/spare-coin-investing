var coinbase = {
    authorize_user: function authorize_user() {
        
        // todo: make redirect_uri dependent on production or development
        // set coinbase scopes
        var scope = encodeURIComponent(`${process.env.COINBASE_SCOPE}`);
        var redirect_uri = encodeURIComponent(`${process.env.COINBASE_AUTH_REDIRECT}`);
        window.open(`https://www.coinbase.com/oauth/authorize?client_id=25e8fd7b1e19d877903dc36fd4027fdb2594941a1c351899dfe1b44c22c00a7b&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`);
    }
}

module.exports = coinbase;