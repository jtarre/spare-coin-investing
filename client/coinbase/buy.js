var axios = require('axios');
var config = require('../../config');
var buy = function buy() {
    axios.get(`${config.SERVER_URL}/buy`)
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