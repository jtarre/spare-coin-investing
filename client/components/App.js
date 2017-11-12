const React = require('react');
const ReactDOM = require('react-dom');

import { BrowserRouter as Router,
        Route,
        Link,
        Switch } from 'react-router-dom';

const Dashboard = require('./Dashboard');
const Purchase = require('./Purchase');
const Contact = require('./Contact');
require('../index.css')

// https://github.com/ReactTraining/react-router/issues/4105#issuecomment-291834881
// TODO: Error, Plaid isn't loaded (where to place error condition?)
class App extends React.Component {
    constructor(props) {
        super(props)
        console.log('---- APPS URL ----\n', window.location.href);
        this.handleBankAccessTokenChange = this.handleBankAccessTokenChange.bind(this);
        this.handleBankAccountIdChange = this.handleBankAccountIdChange.bind(this);

        let coinbase_access_token = this.getIfCoinbaseAccessToken(window.location.href);
        this.state = {
            bank_access_token: "",
            bank_account_id: "",
            bitcoin_access_token: coinbase_access_token,
        }
    }

    getIfCoinbaseAccessToken(url) {
        let access_token;
        if(url.includes("?")) {
            let token_index = url.indexOf("?");
            access_token = url.substring(token_index+1);
        } else {
            access_token = "";
        }

        return access_token;
    }

    handleBankAccessTokenChange(e) {
        this.setState({bank_access_token: e.target.value});
    }

    handleBankAccountIdChange(e) {
        this.setState({bank_account_id: e.target.value});
    }

    render() {
        const { 
            bank_access_token, 
            bank_account_id, 
            bitcoin_access_token } = this.state;
        return (
            <Router>
                <div>
                    <nav className="navbar">
                        <ul className="nav navbar-nav mainnav">
                            <li className="navbutton">
                                <Link className="navLink" to="/purchase">
                                Purchase
                                </Link>
                            </li>
                            <li className="navbutton"><Link className="navLink" to="/contact">Contact</Link></li>
                        </ul>
                    </nav>
                    
                    <Switch>
                        <Route path="/purchase" render={() => (
                            <Purchase 
                                bank_access_token={bank_access_token}
                                bank_account_id={bank_account_id}
                                bitcoin_access_token={bitcoin_access_token}
                                handleBankAccessTokenChange={this.handleBankAccessTokenChange}
                                handleBankAccountIdChange={this.handleBankAccountIdChange}
                            />)}/>
                        <Route path="/contact" component={Contact}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;