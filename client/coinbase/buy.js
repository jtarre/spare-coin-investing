var axios = require('axios');

var buy = function buy() {
    axios.get('https://spare-coin-investing-jtarre.c9users.io:8081/buy')
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