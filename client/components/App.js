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
const plaid_handler = require('../helpers/plaid_handler');

// https://github.com/ReactTraining/react-router/issues/4105#issuecomment-291834881
// TODO: Error, Plaid isn't loaded (where to place error condition?)
class App extends React.Component {
    constructor(props) {
        super(props)
        console.log('---- APPS URL ----\n', window.location.href);
        let coinbase_access_token = this.getIfCoinbaseAccessToken(window.location.href);
        const { plaid_link,get_access_token,get_transactions, get_loose_change } = plaid_handler; 
        this.plaid_link = plaid_link.bind(this);
        this.get_access_token = () => get_acess_token();
        this.get_transactions = () => get_transactions();
        this.get_loose_change = () => get_loose_change(); 
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
                                plaid_link={this.plaid_link}
                            />)}/>
                        <Route path="/contact" component={Contact}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App;