var axios = require('axios');

var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Switch = ReactRouter.Switch;

var BuyBitcoin = require('./BuyBitcoin');
var Authorize = require('./Authorize');

class Purchase extends React.Component {
    constructor(match) { // match is a React Router term
        super(match);
        console.log("what's in Purchase's match?\n", match);
    }
    
    render() {
        return (
            <div>
                <section className="masthead">
                    <div className="sectionNavWrapper">
                        <div className="row">
                            <nav>
                                <ul className="sectionNav">
                                    <li className="sectionNav-item">
                                        <Link className="sectionNav-link" to="/purchase/authorize">Authorize Accounts</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <Route path="/purchase/authorize" component={Authorize} />
                <section className="masthead">
                    <div className="sectionNavWrapper">
                        <div className="row">
                            <nav>
                                <ul className="sectionNav">
                                    <li className="sectionNav-item">
                                        <Link className="sectionNav-link" to="/purchase/buy-bitcoin">Buy Bitcoin</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
                <Route path="/purchase/buy-bitcoin" component={BuyBitcoin} />
            </div>
        )
    }
}

module.exports = Purchase;