var React = require('react');
var axios = require('axios');
var coinbase = require('../../utils/coinbase');
var plaid_handler = require('../helpers/plaid_handler');
var set_recurring_purchase = require('../helpers/set_recurring_purchase');
var buy_crypto = require('../helpers/buy_crypto');
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
    // todo: need to pass in loose change as a prop to the buy button
    // todo: need to define buy_crypto
    return (
        <div>
            <button onClick={buy_crypto}></button>
        </div>
    );
}

function LooseChange(props) {
    // todo: need to pass the loose change value from here up to the parent
    // todo: need to save the loose change value on the parent
    return (
        <div>
            <p>From the last 30 days...</p>
            <button onClick={plaid_handler.get_loose_change}>
                Print transactions
            </button>   
        </div>
    );
}

/*
 * Ok, design
 * san serif font
 * mvp
 * no database
 * walk through form
 * like typescript
 * step 1. authorize bank account
 * step 2. authorize coinbase
 * step 3. get value of loose change
 * step 3a. print value of loose change
 * 3a1. congrats, you have some loose change! 
 * 4. make purchase
 * 4a. Buy {loose_change} worth of bitcoin!
 */
class Purchase extends React.Component {
    render() {
        return (
            <div>
                <h1>Step 1: Connect your Coinbase account</h1>
                <Coinbase />
                
                <h1>Step 2: Connect your bank account</h1>
                <Plaid />

                <h1>Step 3: Get the value of your loose change</h1>
                <LooseChange />
                
                <h1>Step 4: Buy Bitcoin!</h1>
                <Buy />
            </div>
        )
    }
}

module.exports = Purchase;