"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg");
const ffmpeg = require("fluent-ffmpeg");
const ffprobePath = require("@ffprobe-installer/ffprobe");
const icon = path.join(__dirname, "../../resources/icon.png");
ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);
electron.ipcMain.handle("compress", (_event, options) => {
  ffmpeg(options.file).videoCodec("libx264").audioCodec("libmp3lame").fps(options.fps).size(options.size).on("error", function(err) {
    console.log("An error occurred: " + err.message);
  }).on("end", function() {
    console.log("Processing finished !");
  }).on("progress", function(progress) {
    console.log("Processing: " + progress.percent + "% done");
  }).save("C:\\Users\\njsy\\Videos\\aaa.mp4");
});
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 350,
    height: 666,
    frame: false,
    resizable: false,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    x: 1550,
    y: 10,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
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
  electron.ipcMain.on("ping", () => console.log("pong"));
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
