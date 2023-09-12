"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs");
electron.ipcMain.handle("read", async () => {
  return readFile();
  function readFile() {
    return new Promise((res) => {
      fs.readFile("./data.json", "utf-8", (err, data) => {
        if (err) {
          fs.writeFile("./data.json", JSON.stringify({ "todos": [], "deleted": [], "archived": [], "theme": "t1" }), () => {
          });
          res(JSON.stringify({ "todos": [], "deleted": [], "archived": [], "theme": "t1" }));
        } else {
          res(data);
        }
      });
    });
  }
});
electron.ipcMain.handle("write", (ev, arg) => {
  fs.writeFile("./data.json", JSON.stringify(arg), () => {
  });
});
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 480,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? {} : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
