var config = require('../../config');
var axios = require('axios');

function plaid_link() {
    Plaid.create({ // Plaid object defined in client/index.js (as of 10/21)
        // TODO: switch these to environment variables
        apiVersion: 'v2',
        clientName: 'Plaid Walkthrough Demo',
        env: 'sandbox',
        product: ['transactions'],
        key: 'cc7072dba7fd41708a3f08a394942f',
        onSuccess: setStateBank.bind(this)
    }).open()
}

async function setStateBank(public_token, metadata) {
    const { data } = await save_access_token(public_token);
    const { bank_access_token, bank_account_id } = data;
    this.setState({bank_access_token, bank_account_id});
    console.log('--- Current App State ---\n', this.state);
}

// paired with the server method save_access_token
async function save_access_token (public_token) { 
    var body = { public_token: public_token };
    console.log('app env...', process.env.APP_ENV);
    
    let response = await axios.post(`${config.server_url}/save_access_token`, body);
    console.log('--- This Test ---\n', this);
    console.log('--- RESPONSE ---\n', response);
    return response;
    // return axios.post(`${config.server_url}/save_access_token`, body)
    // .then(response)
    // .catch(error)

    // const response = (response) => {
    //     console.log('--- State Test ---\n', this.state);
    //     console.log(response);
    //     // todo: save token and account id to state.
    //     // const {bank_access_token, bank_account_id} = data;
    //     // this.setState({bank_access_token, bank_account_id})
    //     var bank_access_token = response.data.bank_access_token;
    //     var bank_account_id = response.data.bank_account_id;
    //     console.log('Bank account connected!')
    // } 

    // const error = (error) => {
    //     console.error(error);
    //     // todo: response messages 
    //     // todo: error conditions on app
    //     console.log("Something went wrong, please try again.");
    // }
}
const handleBankAccessTokenChange = (e) => (
    this.setState({bank_access_token: e.target.value})
)
    

const handleBankAccountIdChange = (e) => (
    this.setState({bank_account_id: e.target.value})
)

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

const get_transactions = () => {
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

const get_loose_change = () => {
    var res = response.bind(this);

    return axios.post(`${config.server_url}/get_loose_change`)
    .then(res)
    .catch(error)

    function response(response) {
        console.log(response);
        this.setState({loose_change: response.data.change});
        console.log('loose change calculated!')
    } 

    function error(error) {
        console.error(error);
        console.log("Something went wrong, please try again.");
    }
}



const plaid_handler = {
    plaid_link: plaid_link,
    get_access_token: get_access_token,
    get_transactions: get_transactions,
    get_loose_change: get_loose_change
}

module.exports = plaid_handler;