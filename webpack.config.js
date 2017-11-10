var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');
var webpack = require('webpack');

// NODE_ENV production
// uglify javascript

var config = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader'] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        }),
        new Dotenv({
            path: './.env'
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }), 
        // new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = config;