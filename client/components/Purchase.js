const React = require('react');
import { BrowserRouter as Router, 
        Route,
        Link,
        Switch} from 'react-router-dom';
const BuyBitcoin = require('./BuyBitcoin');
const Authorize = require('./Authorize');
const axios = require('axios');
const plaid_handler = require('../helpers/plaid_handler');
const authorize_user = require('../coinbase/authorize_user');

// excellent explanation of passing props to routes in the react-router library
// https://github.com/ReactTraining/react-router/issues/4105
const Coinbase = () => (
    <div>
        <button className="btn btn-default" onClick={authorize_user}>
            Authorize Coinbase
        </button>
    </div>
)

const Plaid = ({ plaid_link }) => (
    <button className="btn btn-default" onClick={plaid_link}>
        Authorize Bank Account
    </button>
)

const SectionNav = ({header, path}) => (
    <section className="masthead">
        <div className="sectionNavWrapper">
            <div className="row">
                <nav>
                    <ul className="sectionNav">
                        <li className="sectionNav-item">
                            <Link className="sectionNav-link" to={`${path}`}>{header}</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
)

const PurchaseStep = ({component: Component, header, path, ...rest}) => (
    <div>
        <SectionNav header={header} path={`${path}`}/>
        <Route path={`${path}`} render={
            props => <Component {...rest} {...props}/> 
        }/>
    </div> 
)

const Purchase = ({ bank_access_token, bank_account_id, 
    bitcoin_access_token, bitcoin_refresh_token,
    loose_change, plaid_link, 
    onLooseChangeChange, get_loose_change}) => (    
    <div>
        <PurchaseStep 
            header="First, authorize Coinbase" 
            path="/purchase/authorize/coinbase" 
            component={Coinbase}
        />

        <PurchaseStep 
            header="Next, authorize your bank account"
            path="/purchase/authorize/bank"
            
            component={Plaid}
            
            // Plaid's Props
            plaid_link={plaid_link}
        />

        <PurchaseStep 
            header="Finally, buy Bitcoin!"
            path="/purchase/buy-bitcoin"
            
            component={BuyBitcoin}
            
            // BuyBitcoin's props
            bank_access_token={bank_access_token}
            bank_account_id={bank_account_id}
            
            bitcoin_access_token={bitcoin_access_token}
            bitcoin_refresh_token={bitcoin_refresh_token}

            loose_change={loose_change}
            get_loose_change={get_loose_change}
            onLooseChangeChange={onLooseChangeChange}
        />
    </div>
)

module.exports = Purchase;