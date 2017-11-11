var React = require('react');
var set_recurring_purchase = require('../helpers/set_recurring_purchase');

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

module.exports = RecurringPurchase;