var React = require('react');
var plaid_handler = require('../helpers/plaid_handler');
var buy = require('../coinbase/buy');

function Buy(props) {
    // todo: need to pass in loose change as a prop to the buy button
    // todo: need to define buy
    return (
        <div>
            <button className="btn btn-default" onClick={buy}>Buy Bitcoin</button>
        </div>
    );
}

class LooseChange extends React.Component {
    // todo: need to pass the loose change value from here up to the parent
    // todo: need to save the loose change value on the parent
    constructor(props) {
        super(props);
        this.get_loose_change = this.get_loose_change.bind(this);
    }
    
    get_loose_change() {
        this.props.get_loose_change();    
    }
    
    render() {
        var loose_change = this.props.loose_change;
        return (
            <div>
                <p>From the last 30 days...</p>
                <button className="btn btn-default" onClick={this.get_loose_change}>
                    Get loose change
                </button>
                <h3>Loose Change: </h3><input type="number" value={loose_change} />
                
            </div>
        );
    }
}

class BuyBitcoin extends React.Component {
    constructor(props) {
        super(props);
        this.get_loose_change = plaid_handler.get_loose_change.bind(this);
        this.state = { loose_change: "" };
    }
    render() {
        var loose_change = this.state.loose_change;
        return (
            <div className="sectionWrapper">
                <h1>Calculate your loose change</h1>
                <LooseChange
                    loose_change={loose_change}
                    get_loose_change={this.get_loose_change}
                />
                
                <h1>Buy Bitcoin with Coinbase</h1>
                <Buy />
            </div>
        )
    }
}

module.exports = BuyBitcoin;