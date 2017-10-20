var React = require('react');
var coinbase = require('../../utils/coinbase');
console.log('coinbase...', coinbase);
class Purchase extends React.Component {
    render() {
        return (
            <div>
                <h1>Coinbase</h1>
                    <button onClick={coinbase.authorize_user}>
                        Connect to Coinbase
                    </button>
                <h1>Plaid</h1>
            </div>
        )
    }
}

module.exports = Purchase;