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
    this.setState({bank_access_token, bank_account_id});
}

// paired with the server method save_access_token
async function save_access_token (public_token) { 
    var body = { public_token: public_token };
    console.log('app env...', process.env.APP_ENV);
    
    let response = await axios.post(`${config.server_url}/save_access_token`, body);
    console.log('--- This Test ---\n', this);
    console.log('--- RESPONSE ---\n', response);
    return response;
}

// paired with the server method get_access_token
const get_access_token = () => { 
    return axios.get(`${config.server_url}/get_access_token`)
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
    return axios.post(`${config.server_url}/transactions`)
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

// 
async function get_loose_change() {
    let { bank_access_token, bank_account_id } = this.state;
    let body = { bank_access_token, bank_account_id };
    
    let { data } = await axios.post(`${config.server_url}/get_loose_change`, body)
    let { change } = data;
    console.log('--- Loose Change Response ---\n', data, change);
    this.setState({ loose_change: change });
    console.log('--- App state ---\n', this.state);
    // function response(response) {
    //     console.log(response);
    //     this.setState({loose_change: response.data.change});
    //     console.log('loose change calculated!')
    // } 

    // function error(error) {
    //     console.error(error);
    //     console.log("Something went wrong, please try again.");
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