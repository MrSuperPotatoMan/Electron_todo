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

  ipcMain.handle('export',() => {
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
  ipcMain.handle('import',() => {
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

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})