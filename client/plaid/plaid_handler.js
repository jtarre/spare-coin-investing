var config = require('../../config');
var axios = require('axios');

function plaid_link() {
    // assuming we're calling with App component.
    // trouble if we're not!
    this.state.plaidClient.open() 
}

function save_plaid_link() {
    // we create Plaid object on page load 
    // to make sure concurrent users don't overwrite a global 
    // Plaid object. 
    // That wouldn't be good!
    return Plaid.create({ 
        apiVersion: 'v2',
        clientName: 'Plaid Walkthrough Demo',
        env: 'development',
        product: ['transactions'],
        key: 'cc7072dba7fd41708a3f08a394942f',
        onSuccess: setStateBank.bind(this)
    })
}

async function setStateBank(public_token, metadata) {
    const { data } = await save_access_token(public_token);
    const { bank_access_token, bank_account_id } = data;
    let isBankAccountActive = true;
    this.setState({bank_access_token, bank_account_id, isBankAccountActive});
}

// paired with the server method save_access_token
async function save_access_token (public_token) { 
    var body = { public_token: public_token };
    
    let response = await axios.post(`${config.server_url}/save_access_token`, body);
    return response;
}

// paired with the server method get_access_token
const get_access_token = () => { 
    return axios.get(`${config.server_url}/get_access_token`)
    .then(response)
    .catch(error)

    function response(response) {
    } 

    function error(error) {
        console.error(error);
    }
}

function get_transactions() {
    return axios.post(`${config.server_url}/transactions`)
    .then(response)
    .catch(error)

    function response(response) {
    } 

    function error(error) {
        console.error(error);
    }
}

// 
async function get_loose_change() {
    let { bank_access_token, bank_account_id } = this.state;
    let body = { bank_access_token, bank_account_id };
    
    let { data } = await axios.post(`${config.server_url}/get_loose_change`, body)
    let { change } = data;
    this.setState({ loose_change: change });
    // function response(response) {
    //     this.setState({loose_change: response.data.change});
    // } 

    // function error(error) {
    //     console.error(error);
    // }
}



const plaid_handler = {
    plaid_link: plaid_link,
    save_plaid_link: save_plaid_link,
    get_access_token: get_access_token,
    get_transactions: get_transactions,
    get_loose_change: get_loose_change
}

module.exports = plaid_handler;