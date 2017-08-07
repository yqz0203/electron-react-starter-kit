const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
const SplashWindow = require('./window/SplashWindow')
const HomeWindow = require('./window/HomeWindow')

let homeWin
let splashWin
app.on('ready', () => {
    splashWin = new SplashWindow()
})

ipcMain.once('slash-ok', () => {
    createWindow()
})

function createWindow() {
    homeWin = new HomeWindow()

    homeWin.once('closed', () => {
        homeWin = null
    })

    homeWin.show()

    if (splashWin) {
        splashWin.destroy()
        splashWin = null
    }
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (homeWin === null) {
        createWindow()
    }
})