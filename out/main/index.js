"use strict";
const electron = require("electron");
const path$1 = require("path");
const utils = require("@electron-toolkit/utils");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg");
const ffmpeg = require("fluent-ffmpeg");
const ffprobePath = require("@ffprobe-installer/ffprobe");
const icon = path$1.join(__dirname, "../../resources/icon.png");
const path = require("path");
ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);
class Ffmpeg {
  constructor(_event, options) {
    this._event = _event;
    this.options = options;
    this.ffmpeg = ffmpeg(this.options.file.path);
  }
  ffmpeg;
  processEvent(progress) {
    console.log("Processing: " + progress.percent + "% done");
  }
  error(err) {
    console.log("An error occurred: " + err.message);
  }
  end() {
    console.log("Processing finished !");
  }
  run() {
    console.log(this.options);
    this.ffmpeg.fps(this.options.fps).size(this.options.size).videoCodec("libx264").on("error", this.error.bind(this)).on("end", this.end.bind(this)).on("progress", this.processEvent.bind(this)).save(path.resolve(__dirname, "../../hd-finish.mp4"));
  }
}
electron.ipcMain.handle("compress", async (_event, options) => {
  console.log(options);
  const compress = new Ffmpeg(_event, options);
  compress.run();
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
      preload: path$1.join(__dirname, "../preload/index.js"),
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
    mainWindow.loadFile(path$1.join(__dirname, "../renderer/index.html"));
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
//# sourceMappingURL=index.js.map
