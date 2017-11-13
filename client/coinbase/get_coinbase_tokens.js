function get_coinbase_tokens(url) {
    let coinbase_access_token;
    let coinbase_refresh_token;
    let isCoinbaseActive = false;
    if(url.includes("?")) { // tokens preset, we have to transform to json
        let token_index = url.indexOf("?");
        let query = url.substring(token_index+1);
        let json_string = `{"${query
                .replace(/=/g, '":"')
                .replace(/&/g, '","')}"}`;
        let json = JSON.parse(json_string);
        coinbase_access_token = json.access_token;
        coinbase_refresh_token = json.refresh_token;
        isCoinbaseActive = true;
    } else {
        coinbase_access_token = "";
        coinbase_refresh_token = "";
    }
    return { coinbase_access_token, coinbase_refresh_token, isCoinbaseActive };
}

module.exports = get_coinbase_tokens;