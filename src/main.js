const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// const path = require('path');
// const isDev = require('electron-is-dev');

let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000, 
    height: 670,
    resizable: false,
    show: false
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => mainWindow = null);
});