var axios = require('axios');
var config = require('../../config');
async function buy() {
    let { loose_change, bitcoin_access_token, bitcoin_refresh_token } = this.state;
    let purchase = {loose_change, bitcoin_access_token, bitcoin_refresh_token};
    console.log('--- Purchase ---\n', purchase);
    let { data } = await axios.post(`${config.server_url}/buy`, purchase)
    if(data.status === "created")
        this.setState({isBuySuccessful: true});
}

module.exports = buy;