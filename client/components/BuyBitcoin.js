const React = require('react');
const plaid_handler = require('../helpers/plaid_handler');
const buy = require('../coinbase/buy');

const Buy = ({loose_change, bitcoin_access_token, bitcoin_refresh_token}) => {
    // todo: need to pass in loose change as a prop to the buy button
    // todo: need to define buy
    let buyBitcoin = buy.bind(this, loose_change, bitcoin_access_token, bitcoin_refresh_token);
    return (<div>
        <button className="btn btn-default" onClick={buyBitcoin}>Buy {loose_change} dollars of Bitcoin!</button>
    </div>)
}
// todo: input onChange=""
const LooseChange = ({ loose_change, get_loose_change, onLooseChangeChange }) => (
    // todo: need to pass the loose change value from here up to the parent
    // todo: need to save the loose change value on the parent
    <div>
        
        <p>
            <button className="btn btn-default" onClick={get_loose_change}>
                Get loose change
            </button>&nbsp;
            <input type="number" value={loose_change} onChange={onLooseChangeChange}/> (from the last 30 days)
        </p>
    </div>
)

const BuyBitcoin = ({
    bank_access_token, bank_account_id, // data for bank auth
    bitcoin_access_token, bitcoin_refresh_token, // data from coinbase auth
    onLooseChangeChange, loose_change, get_loose_change}) => ( // calculate loose change
    <div className="sectionWrapper">
        <LooseChange
            loose_change={loose_change}
            get_loose_change={get_loose_change}
            onLooseChangeChange={onLooseChangeChange}
        />
        <Buy 
            loose_change={loose_change} 
            bitcoin_access_token={bitcoin_access_token}
            bitcoin_refresh_token={bitcoin_refresh_token}/>
    </div>    
)

module.exports = BuyBitcoin;