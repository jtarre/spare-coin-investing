function get_coinbase_tokens(url) {
    let coinbase_access_token;
    let coinbase_refresh_token;
    if(url.includes("?")) { // tokens preset, we have to transform to json


        let token_index = url.indexOf("?");
        let query = url.substring(token_index+1);
        let json_string = `{"${query
                .replace(/=/g, '":"')
                .replace(/&/g, '","')}"}`;
        console.log('--- json string ---\n', json_string)
        let json = JSON.parse(json_string);
        coinbase_access_token = json.access_token;
        coinbase_refresh_token = json.refresh_token;
        console.log('--- access & refresh ---\n', coinbase_access_token, coinbase_refresh_token);
    } else {
        coinbase_access_token = "";
        coinbase_refresh_token = "";
    }
    console.log('--- access & refresh deux ---\n', coinbase_access_token, coinbase_refresh_token);
    return { coinbase_access_token, coinbase_refresh_token };
}

module.exports = get_coinbase_tokens;