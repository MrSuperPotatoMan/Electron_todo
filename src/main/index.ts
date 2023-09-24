import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import fs from 'fs'

ipcMain.handle('read', async ()=>{
  return readFile()
  function readFile(){
    return new Promise((res) => {
      fs.readFile('./data.json', "utf-8",(err, data) => {
        if (err) {
          fs.writeFile('./data.json', JSON.stringify({"todos":[],"deleted":[],"archived":[],"theme":"t1"}), () => { })
          res(JSON.stringify({"todos":[],"deleted":[],"archived":[],"theme":"t1"}))
        } else {
          res(data)
        }
      })
    })
  }
})

ipcMain.handle('write',(ev,arg) => {
  fs.writeFile('./data.json',JSON.stringify(arg),()=>{})
})

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 480,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  ipcMain.handle('export',(ev,arg) => {
    const options = {
      title: "Save file",
      buttonLabel : "Save",
      filters :[
          {name: 'txt', extensions: ['txt']},
          {name: 'All Files', extensions: ['*']}
      ],
    };
    dialog.showSaveDialog(mainWindow, options).then(({ filePath = './' }) => {
      fs.readFile('./data.json',(err,data) => {
        fs.writeFileSync(filePath, data, 'utf-8');
      })
    });
  })
  ipcMain.handle('import',(ev,arg) => {
    const options = {
      title: "Load data",
      buttonLabel : "Load",

      filters :[
          {name: 'txt', extensions: ['txt']},
          {name: 'All Files', extensions: ['*']}
      ],
    };
    return new Promise((res,rej) => {dialog.showOpenDialog(mainWindow, options).then(({filePaths}) => {
      filePaths.forEach(filePath => {
        fs.readFile(filePath,(err,data) => {
          try {
            const parsedNewData = JSON.parse(data.toString("utf-8"))
            fs.readFile('./data.json', "utf-8",(err, data) => {

              const parsedData = JSON.parse(data);
              parsedData.todos = [
                ...parsedData.todos,
                ...parsedNewData.todos
              ]
              parsedData.deleted = [
                ...parsedData.deleted,
                ...parsedNewData.deleted
              ]
              parsedData.archived = [
                ...parsedData.archived,
                ...parsedNewData.archived
              ]
              if (err) {
                console.log(err)
                rej(err)
              } else {
                fs.writeFile('./data.json',JSON.stringify(parsedData),() => {
                  res(parsedData)
                })
              }
            })
            
          } catch (error) {
            rej("Wrong or corrupted file.")
          }
        })
      })
    })})
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})