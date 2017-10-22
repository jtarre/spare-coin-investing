var axios = require('axios');

var set_recurring_purchase = function set_recurring_purchase(frequency) {
    axios.post('/set_recurring_purchase', { frequency: frequency })
    .then(response)
    .error(error)
}

function response(response) {
    // TODO: indicate happy state, recurring purchase has been set.
    console.log(response);
    // some UI state
}

function error(error) {
    // TODO: indicate error state
    console.error(error);
    // some UI state.
}

module.exports = set_recurring_purchase;