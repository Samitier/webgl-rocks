let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require("extract-text-webpack-plugin")
let HtmlWebpackPlugin = require('html-webpack-plugin')
let release = process.argv.indexOf('--release') !== -1


module.exports = {
    entry: {
        app: './client/main.js'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        filename: 'assets/[name].bundle.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './client/index.html', hash: true, filename: 'index.html' }),
        new ExtractTextPlugin("assets/style.bundle.css", { allChunks: true })
    ],
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize"),
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production' || release) {
    module.exports.devtool = ''
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin()
    ])
}