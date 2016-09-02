const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

const config = {

    dev: {
        devtool: 'cheap-module-eval-source-map',
        entry: [
            './src/js/app'
        ],
        output: {
            path: path.join(__dirname, 'public/js'),
            filename: 'bundle.js',
            publicPath: '/static/js/'
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel'],
                    exclude:  /(node_modules|bower_components)/,
                    include: __dirname
                },
                {
                    test: /\.json$/,
                    include: /node_modules/,
                    loader: 'json-loader'
                }
            ]
        }
    },

    production: {
        devtool: null,
        entry: [
            './src/js/app'
        ],
        output: {
            path: path.join(__dirname, 'public/js'),
            filename: 'bundle.min.js',
            publicPath: '/static/js/'
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel'],
                    exclude:  /(node_modules|bower_components)/,
                    include: __dirname
                }
            ]
        }
    }
};

module.exports = debug ? config.dev : config.production;