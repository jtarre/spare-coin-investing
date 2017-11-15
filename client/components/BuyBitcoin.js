const React = require('react');
const plaid_handler = require('../plaid/plaid_handler');

class Buy extends React.Component {
    // todo: need to pass in loose change as a prop to the buy button
    // todo: need to define buy
    constructor(props) {
        super(props);
        this.displayConfirm = this.displayConfirm.bind(this);
    }

    displayConfirm() {
        console.log('display');
    }

    render() {
        let {buy, loose_change} = this.props;
        return (
        <div>
            <button className="btn btn-default" onClick={this.displayConfirm}>
                Buy {loose_change} dollars of Bitcoin!
            </button>
            <Modal buy={buy} loose_change={loose_change} />
        </div>
        )   
    }
     
}

const Modal = ({buy, loose_change}) => (
    <div className="modal">
        <div className="modalBody">
            <p>Are you sure you want to buy {loose_change} dollars of Bitcoin?</p>
            <button className="btn btn-default" onClick={buy}>
                Yes
            </button>
        </div>
    </div>
)

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
    buy, // buy bitcoin
    onLooseChangeChange, loose_change, get_loose_change}) => ( // calculate loose change
    <div className="sectionWrapper">
        <LooseChange
            loose_change={loose_change}
            get_loose_change={get_loose_change}
            onLooseChangeChange={onLooseChangeChange}
        />
        <Buy buy={buy} loose_change={loose_change}/>
    </div>    
)

module.exports = BuyBitcoin;