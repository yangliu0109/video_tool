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
  // progressNotice: (callback: (prgress: number) => void) => {
  //   ipcRenderer.on('progressNotice', (_event: IpcRendererEvent, prgress: number) => {
  //     callback(prgress)
  //   })
  // },
  mainProcessNotice: (callback) => {
    electron.ipcRenderer.on("mainProcessNotice", (_event, type, options) => {
      callback(type, options);
    });
  },
  stop: () => {
    electron.ipcRenderer.invoke("stop");
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
