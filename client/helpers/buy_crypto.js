var axios = require('axios');

var buy_crypto = function buy_crypto() {
    axios.get('/buy_crypto')
    .then(response)
    .error(error)
}

function response(response) {
    console.log(response);
}

function error(error) {
    console.error(error);
}
module.exports = buy_crypto;