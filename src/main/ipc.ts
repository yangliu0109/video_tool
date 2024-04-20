import { IpcMainInvokeEvent, ipcMain } from "electron";
import Ffmpeg from "./ffmpeg";
import { selectDirectory } from "./directory";
import {CompressOptions} from '../renderer/src/types'

let ffmpeg = null as Ffmpeg | null
ipcMain.handle('compress', async (_event: IpcMainInvokeEvent, options: CompressOptions) => {
    console.log(options);
    
    const compress = new Ffmpeg(_event, options);
    ffmpeg = compress;
    compress.run();
})

ipcMain.handle('selectDirectory', async (_event: IpcMainInvokeEvent) => {
    return selectDirectory()
})

ipcMain.handle('stop', async (_event: IpcMainInvokeEvent) => {
    ffmpeg?.stop()
})