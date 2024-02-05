const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
var webpack = require('webpack');

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
        new webpack.DefinePlugin({
            "process.env.REACT_APP_PASSWORD": JSON.stringify("rdr19p5feb"),
            "process.env.REACT_APP_USER": JSON.stringify("uzytkownik"),
            "process.env.REACT_APP_HOST": JSON.stringify("http://localhost:3000/"),
            "process.env.REACT_APP_LFMUSERNAME": JSON.stringify("Reskim"),
            "process.env.REACT_APP_LFMAPIKEY": JSON.stringify("7eb3c16299dd6d82b6742b2d26d6ec55")
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