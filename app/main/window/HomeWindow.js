const { BrowserWindow, ipcMain } = require('electron')
const getFilePath = require('./getFilePath')

class HomeWindow extends BrowserWindow {
    constructor() {
        super({
            height: 600,
            width: 1024,
            backgroundColor: '#4545ff',
            titleBarStyle: 'hidden'
        })

        this.loadURL(getFilePath('./home.html'))

        this.listener = () => {
            this.setSize(1024, 600)
            this.center()
        }
        this.listenLoginStateChange()

        this.on('closed', () => {
            this.unListenLoginStateChange()
        })
    }

    listenLoginStateChange() {
        ipcMain.on('login-ok', this.listener)
    }

    unListenLoginStateChange() {
        ipcMain.removeListener('login-ok', this.listener)
    }
}

module.exports = HomeWindow