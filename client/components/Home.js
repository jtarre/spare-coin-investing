const React = require('react');
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="sectionWrapper"> 
        <h1>Welcome!</h1>
        <p><em><sm>"Compound interest is the 8th wonder of the world."
         - Albert Einstein</sm></em></p>
        <div className="callToAction">
            <h3>Want to get started now? Click Purchase to get going</h3>
            <Link className="btn btn-primary" to="/purchase">Purchase Bitcoin</Link>
        </div>
        
        <h3>Bitcoin, the world's most reliable financial network</h3>
        <p>Now 9 years old with an uptime of <a href="http://bitcoinuptime.com/" target="_blank">
        99.992%</a>, Bitcoin has the highest up time of any financial network in the world.
        </p>
        <p>Given the value it provides its users, Bitcoin, like the internet and electric grid,
        will be a valuable asset to own for decades.</p>
        <h3>Invest a small amount periodically, reap the reward</h3>
        <p><em><sm>“The best time to plant a tree was 20 years ago.
        The second best time is now.” – Chinese Proverb</sm></em></p>
        <p>The most effective action you can take is to invest a small amount now.</p>
        <h3>Who are we?</h3>
        <p>Spare Coin Investing helps you invest your spare change in Bitcoin.</p>
        <p>Using top-rated security applications, we allow you
        to calculate your loose change and invest that into Bitcoin.</p>
        <h3>Security</h3>
        <p>We take your security, and that's why we store none of your
        information on the site.</p> 
        <p>Your Coinbase account and bank account information last only while you're on the site.</p>
        <p>Once you close your browser tab, that information is gone.</p>
        <h2>Get Started</h2>
        <p>Don't wait, add to your Bitcoin portfolio now.</p>
        <Link className="btn btn-primary" to="/purchase">Purchase Bitcoin</Link>
        <p className="investmentClause"><em>*Nothing above should be taken for investment advice.</em></p>
    </div>

)

module.exports = Home