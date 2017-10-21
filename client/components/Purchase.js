var React = require('react');
var axios = require('axios');
var coinbase = require('../../utils/coinbase');

var handleOnSuccess = function handleOnSuccess (public_token, metadata) {
    console.log('public_token...\n', public_token)
    console.log('metadata...\n', metadata);
}
console.log('plaidpurch...', Plaid);

class Purchase extends React.Component {
    handler() {
        console.log(onSuccess);
        return Plaid.create({
            apiVersion: 'v2',
            clientName: 'Plaid Walkthrough Demo',
            env: 'sandbox',
            product: ['transactions'],
            key: 'cc7072dba7fd41708a3f08a394942f',
            onSuccess: onSuccess
        }).open();
        
        function onSuccess(public_token, metadata) {
            console.log('public_token...', public_token);
            console.log('metadata...\n', metadata);
            get_access_token();

            // $.post('/get_access_token', {
            //   public_token: public_token
            // }, function() {
            //   $('#container').fadeOut('fast', function() {
            //     $('#intro').hide();
            //     $('#app, #steps').fadeIn('slow');
            //   });
            // });
            function get_access_token() {
                var body = { public_token: public_token };
                return axios.post('http://spare-coin-investing-jtarre.c9users.io:8081/get_access_token', body)
                .then(response_get_access_token)
                .catch(error_get_access_token)
                
                function response_get_access_token(response) {
                    console.log(response);
                    console.log('You are connected!')
                } 
                
                function error_get_access_token(error) {
                    console.error(error);
                    console.log("Something went wrong, please try again.");
                } 
                
            }
        }
    }
    
    render() {
        
        return (
            <div>
                <h1>Coinbase</h1>
                    <button onClick={coinbase.authorize_user}>
                        Connect to Coinbase
                    </button>
                <h1>Plaid</h1>
                <button onClick={this.handler}>Link Accounts</button>
                <button>Plaid status</button>
            </div>
        )
    }
}

module.exports = Purchase;