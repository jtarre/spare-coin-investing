const React = require('react');
const plaid_handler = require('../helpers/plaid_handler');
const coinbase_authorize_user = require('../coinbase/authorize_user');

const Coinbase = (props) => (
    <div>
        <button className="btn btn-default" onClick={coinbase_authorize_user}>
            Authorize Coinbase
        </button>
    </div>
)

const Plaid = ({plaid_link}) => (
    <div>
        <button className="btn btn-default" onClick={plaid_link}>
            Authorize Bank Account
        </button>
    </div>
)

const Authorize = ({plaid_link}) => (
    <div className="sectionWrapper">
        <h1>Authorize Coinbase</h1>
        <Coinbase />
        
        <h1>Authorize your bank account</h1>
        <Plaid plaid_link={plaid_link}/>
    </div>
)

module.exports = Authorize;