const { BrowserWindow } = require('electron')
const getFilePath = require('./getFilePath')

class SplashWindow extends BrowserWindow {
    constructor() {
        super({
            height: 200,
            width: 400,
            resizable: false,
            frame: false,
            show: false
        })

        this.loadURL(getFilePath('splash.html'))
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = SplashWindow