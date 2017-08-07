/**
 * 主进程webpack配置
 */

const webpack = require('webpack')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const BabiliPlugin = require("babili-webpack-plugin")

process.env.BABEL_ENV = 'renderer'

const __dev__ = process.env.NODE_ENV === 'development'
const __prod__ = process.env.NODE_ENV === 'production'

const config = {
    devtool: 'source-map',
    target: 'electron-main',
    entry: [
        path.resolve(__dirname, '../app/main/index.js')
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),
        new webpack.DefinePlugin({
            '__renderer_path': __dev__ ? JSON.stringify('http://localhost:4000') : '__dirname'
        })
    ]
}

if (__prod__) {
    config.devtool = ''
    config.output.path = path.resolve(__dirname, '../dist/')
    config.plugins.push(
        new CleanPlugin(['dist'], {
            root: path.resolve(__dirname, '../')
        }),
        new BabiliPlugin()
    )
}

module.exports = config