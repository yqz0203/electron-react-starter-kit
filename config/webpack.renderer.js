const webpack = require('webpack')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const BabiliPlugin = require("babili-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

process.env.BABEL_ENV = 'renderer'

const __dev__ = process.env.NODE_ENV === 'development'
const __prod__ = process.env.NODE_ENV === 'production'

// css loaders配置
const cssLoaders = [
    __dev__ ? 'css-loader?sourceMap&importLoaders=1' : 'css-loader?minimize&importLoaders=1',
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: __dev__,
            config: {
                path: path.resolve(__dirname, './postcss.config.js')
            }
        }
    }
]

const config = {
    devtool: 'source-map',
    target: 'electron-renderer',
    entry: [
        'webpack-dev-server/client?http://localhost:4000',
        'webpack/hot/dev-server',
        path.resolve(__dirname, '../app/renderer/index.js')
    ],
    output: {
        filename: 'renderer.bundle.js',
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaders
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoaders.concat([
                        __dev__ ? 'sass-loader?sourceMap' : 'sass-loader'
                    ])
                })
            },
            {
                test: /\.(png|jpg|gif|webp)$/,
                use: ['url-loader?limit=10240']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: 'development' === process.env.NODE_ENV
        }),
        new HtmlPlugin({
            filename: 'splash.html',
            template: path.resolve(__dirname, '../app/renderer/splash/splash.html'),
            nodeModules: process.env.NODE_ENV !== 'production'
                ? path.resolve(__dirname, '../node_modules')
                : false,
            chunks: []
        }),
        new HtmlPlugin({
            filename: 'home.html',
            template: path.resolve(__dirname, '../app/renderer/home/home.html'),
            nodeModules: process.env.NODE_ENV !== 'production'
                ? path.resolve(__dirname, '../node_modules')
                : false
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}

if (process.env.NODE_ENV === 'development') {
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    )
} else {
    config.entry = path.resolve(__dirname, '../app/renderer/index.js')
    config.devtool = ''
    config.plugins.push(
        new BabiliPlugin()
    )
}

module.exports = config