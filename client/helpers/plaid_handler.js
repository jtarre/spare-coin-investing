var axios = require('axios');

var plaid_link = function plaid_link() {
    return Plaid.create({ // Plaid object defined in client/index.js (as of 10/21)
        // TODO: switch these to environment variables
        apiVersion: 'v2',
        clientName: 'Plaid Walkthrough Demo',
        env: 'sandbox',
        product: ['transactions'],
        key: 'cc7072dba7fd41708a3f08a394942f',
        onSuccess: onSuccess
    }).open();
}

function onSuccess(public_token, metadata) {
    console.log('public_token...', public_token);
    console.log('metadata...\n', metadata);
    save_access_token(public_token);
}

// paired with the server method save_access_token
var save_access_token = function save_access_token(public_token) { 
    var body = { public_token: public_token };
    console.log('app env...', process.env.APP_ENV);
    var base_url = process.env.APP_ENV == "local" ? "http://localhost:8081/" : "http://spare-coin-investing-jtarre.c9users.io:8081/";
    
    return axios.post(base_url + 'save_access_token', body)
    .then(response)
    .catch(error)

    function response(response) {
        console.log(response);
        console.log('You are connected!')
    } 

    function error(error) {
        console.error(error);
        console.log("Something went wrong, please try again.");
    }
}

// paired with the server method get_access_token
function get_access_token() { 
    var base_url = process.env.APP_ENV == "local" ? "http://localhost:8081/" : "http://spare-coin-investing-jtarre.c9users.io:8081/";
    
    return axios.get(base_url + 'get_access_token')
    .then(response)
    .catch(error)

    function response(response) {
        console.log(response);
        console.log('You are connected!')
    } 

    function error(error) {
        console.error(error);
        console.log("Something went wrong, please try again.");
    }
}

function get_transactions() {
    var base_url = process.env.APP_ENV == "local" ? "http://localhost:8081/" : "http://spare-coin-investing-jtarre.c9users.io:8081/";
    
    return axios.post(base_url + 'transactions')
    .then(response)
    .catch(error)

    function response(response) {
        console.log(response);
        console.log('loose change calculated!')
    } 

    function error(error) {
        console.error(error);
        console.log("Something went wrong, please try again.");
    }
}

function get_loose_change() {
    var base_url = process.env.APP_ENV == "local" ? "http://localhost:8081/" : "http://spare-coin-investing-jtarre.c9users.io:8081/";
    
    return axios.post(base_url + 'loose_change')
    .then(response)
    .catch(error)

    function response(response) {
        console.log(response);
        console.log('loose change calculated!')
    } 

    function error(error) {
        console.error(error);
        console.log("Something went wrong, please try again.");
    }
}



var plaid_handler = {
    plaid_link: plaid_link,
    get_access_token: get_access_token,
    get_transactions: get_transactions,
    get_loose_change: get_loose_change
}

module.exports = plaid_handler;