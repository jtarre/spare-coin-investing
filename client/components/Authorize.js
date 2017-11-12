var React = require('react');
var plaid_handler = require('../helpers/plaid_handler');
var coinbase_authorize_user = require('../coinbase/authorize_user');

function Coinbase(props) {
    return (
        <div>
            <button className="btn btn-default" onClick={coinbase_authorize_user}>
                Authorize Coinbase
            </button>
        </div>
        
    );
}

function Plaid(props) {
    return (
        <div>
            <button className="btn btn-default" onClick={plaid_handler.plaid_link}>
                Authorize Bank Account
            </button>
        </div>
    );
}

class Authorize extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sectionWrapper">
                <h1>Authorize Coinbase</h1>
                <Coinbase />
                
                <h1>Authorize your bank account</h1>
                <Plaid />
            </div>
        )
    }
}

module.exports = Authorize;