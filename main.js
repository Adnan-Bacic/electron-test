const { app, BrowserWindow } = require('electron')
const path = require('path')

//load index.html
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, './src/preload.js')
      }
    })
  
    win.loadFile('./src/index.html')
  }

  //app must be ready before we can run
  app.whenReady().then(() => {
    createWindow()

    //open app if not open - macos
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })

  //quit app when closed - windows/linux
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })