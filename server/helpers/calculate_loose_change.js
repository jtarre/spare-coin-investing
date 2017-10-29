function calculate_loose_change(transactions) {
    var change = transactions
    .map(get_transaction_value)
    .map(get_transaction_change)
    .reduce(sum, 0);
    var changeRound = Math.round(change * 100) / 100; // keep to two decimals
    return changeRound;
} 

function get_transaction_value(transaction) {
    return transaction.amount;
}

function get_transaction_change(transaction_amount) {
    var cents = transaction_amount - Math.floor(transaction_amount);
    if(cents != 0) return 1 - cents;
    else return 0;
}

function sum(transaction_amount, sum) {
    return sum += transaction_amount;
}

module.exports = calculate_loose_change;