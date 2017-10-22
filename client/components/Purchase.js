var React = require('react');
var axios = require('axios');
var coinbase = require('../../utils/coinbase');
var plaid_handler = require('../helpers/plaid_handler');
var set_recurring_purchase = require('../helpers/set_recurring_purchase');

function Coinbase(props) {
    return (
        <div>
            <h2>Coinbase</h2>
            <button onClick={coinbase.authorize_user}>
                Connect to Coinbase
            </button>
        </div>
        
    );
}

function Plaid(props) {
    return (
        <div>
            <h2>Plaid</h2>
            <button onClick={plaid_handler.plaid_link}>Link Accounts</button>
            <h2>Get Access Token</h2>
            <button onClick={plaid_handler.get_access_token}>Print access token</button>
        </div>
    );
}

function RecurringPurchase(props) {
    return (
        <div>
            
            Frequency
            <select>
                <option val="week">Weekly</option>
                <option val="monthly">Monthly</option>
            </select>
            <button onClick={set_recurring_purchase}>Set up purchase</button>
        </div>
    );
}

function Buy(props) {
    return (
        <div>
            <button onClick={buy_crypto}></button>
        </div>
    );
}

class Purchase extends React.Component {
    render() {
        return (
            <div>
                <h1>Step 1: Connect Accounts</h1>
                <Coinbase />
                <Plaid />
                    
                <h1>Step 2: Set up Recurring Purchase</h1>
                <RecurringPurchase />

                <h1>Step 3: (Temporary) Make a purchase</h1>


            </div>
        )
    }
}

module.exports = Purchase;