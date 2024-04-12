"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  compress: (options) => {
    electron.ipcRenderer.invoke("compress", options);
  },
  selectDirectory: () => {
    return electron.ipcRenderer.invoke("selectDirectory");
  },
  progressNotice: (callback) => {
    electron.ipcRenderer.on("progressNotice", (_event, prgress) => {
      callback(prgress);
    });
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
