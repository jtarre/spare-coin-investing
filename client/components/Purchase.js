var React = require('react');
var axios = require('axios');

var plaid_handler = require('../helpers/plaid_handler');

var coinbase_authorize_user = require('../coinbase/authorize_user');
var buy = require('../coinbase/buy');

var set_recurring_purchase = require('../helpers/set_recurring_purchase');

function Coinbase(props) {
    return (
        <div>
            <h2>Coinbase</h2>
            <button onClick={coinbase_authorize_user}>
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
    // todo: need to define buy
    return (
        <div>
            <button onClick={buy}>Buy Bitcoin</button>
        </div>
    );
}

class LooseChange extends React.Component {
    // todo: need to pass the loose change value from here up to the parent
    // todo: need to save the loose change value on the parent
    constructor(props) {
        super(props);
        this.get_loose_change = this.get_loose_change.bind(this); // do I have to bind?
    }
    
    get_loose_change() {
        this.props.get_loose_change();    
    }
    
    render() {
        var loose_change = this.props.loose_change;
        return (
            <div>
                <p>From the last 30 days...</p>
                <button onClick={this.get_loose_change}>
                    Get loose change
                </button>
                <h2>Loose Change: {loose_change}</h2>
                
            </div>
        );
    }
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
    constructor(props) {
        super(props);
        console.log('constructor this...\n', this);
        this.get_loose_change = plaid_handler.get_loose_change.bind(this);
        this.state = { loose_change: "" };
    }
    
    render() {
        var loose_change = this.state.loose_change;
        return (
            <div>
                <h1>Step 1: Connect your Coinbase account</h1>
                <Coinbase />
                
                <h1>Step 2: Connect your bank account</h1>
                <Plaid />

                <h1>Step 3: Get the value of your loose change</h1>
                <LooseChange
                    loose_change={loose_change}
                    get_loose_change={this.get_loose_change}
                />
                
                <h1>Step 4: Buy Bitcoin!</h1>
                <Buy />
            </div>
        )
    }
}

module.exports = Purchase;