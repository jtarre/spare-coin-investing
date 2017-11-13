var axios = require('axios');
var config = require('../../config');
var buy = function buy(loose_change, bitcoin_access_token, bitcoin_refresh_token) {
    let purchase = {loose_change, bitcoin_access_token, bitcoin_refresh_token};
    axios.post(`${config.server_url}/buy`,purchase)
    .then(handleResponse)
    .catch(handleError)
}

function handleResponse(response) {
    console.log(response);
}

function handleError(error) {
    console.error(error);
}
module.exports = buy;