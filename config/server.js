/**
 * 开发服务器
 */

const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const electron = require('electron')
const mainConfig = require('./webpack.main')
const rendererConfig = require('./webpack.renderer')
const debugRenderer = require('debug')('app:renderer:server')
const debugMain = require('debug')('app:main:server')
const spawn = require('child_process').spawn

let electronProcess
let manualRestart

const initMain = () => new Promise((resolve, reject) => {
    const compiler = webpack(mainConfig)

    compiler.plugin('compile', (compilation) => {
        debugMain('等待主进程打包...')
    })

    compiler.watch({}, (err, stats) => {
        if (err) {
            debugMain.log(err)
        }
        if (electronProcess && electronProcess.kill) {
            debugMain('检测到主进程代码更改，开始重启...')
            manualRestart = true
            process.kill(electronProcess.pid)
            electronProcess = null

            initElectron()

            setTimeout(() => {
                manualRestart = false
            }, 5000)
        }

        debugMain('主进程打包ok...')
        resolve()
    })
})

const initRenderer = () => new Promise((resolve) => {
    rendererConfig.output.publicPath = 'http://localhost:4000/'
    const compiler = webpack(rendererConfig)

    compiler.plugin('compile', (compilation) => {
        debugRenderer('等待渲染进程打包...')
    })

    compiler.plugin('done', () => {
        debugRenderer('渲染进程打包ok...')
        resolve()
    })

    const server = new WebpackDevServer(compiler, {
        stats: {
            colors: true,
            chunks: false,
            modules: false
        },
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        hotOnly: false
    })

    server.listen(4000, '0.0.0.0', function (err) {
        if (err) {
            debugRenderer(`devserver启动失败：${err.message}`)
            process.exit(0)
        }
        debugRenderer(`devserver已经在端口${4000}启动`)
    })
})

const initElectron = () => {
    electronProcess = spawn(electron, ['--inspect=5858', '.'])

    electronProcess.stdout.on('data', data => {
        console.log(data.toString())
    })

    electronProcess.stderr.on('data', data => {
        console.error(data.toString())
    })

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit()
    })
}


Promise.all([
    initMain(),
    initRenderer()
])
    .then(() => {
        initElectron()
    })


