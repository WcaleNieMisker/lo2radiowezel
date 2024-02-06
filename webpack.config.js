const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new Dotenv({
            path: './.env',
            safe: true,
            systemvars: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },

    resolve: {
        fallback: {
            // "fs": false,
            // "https": false,
            "crypto": false,
            // "http": false,
            // "dgram": false,
            // "tls": false,
            // "timers": false,
            // './zlib_bindings': false,
            // "buffer": require.resolve('buffer/'),
            "os": false,
            // "path": false,
            "process": require.resolve('process/browser'),
            "path": require.resolve('path-browserify')
        },
    },
}