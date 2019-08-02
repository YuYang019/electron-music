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
    show: false,
    vibrancy: 'ultra-dark', // 窗口模糊的样式
    transparent: true,
    fullscreenable: false,
    titleBarStyle: 'hidden', // title-bar的样式——隐藏顶部栏的横条，把操作按钮嵌入窗口
  });

  mainWindow.loadURL('http://localhost:3001');

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