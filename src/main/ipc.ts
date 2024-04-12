import { IpcMainInvokeEvent, ipcMain } from "electron";
import Ffmpeg from "./ffmpeg";
import { selectDirectory } from "./directory";
import CompressOptions from '@/renderer/types'

ipcMain.handle('compress', async (_event: IpcMainInvokeEvent, options: CompressOptions) => {
    const compress = new Ffmpeg(_event, options);
    compress.run();
})

ipcMain.handle('selectDirectory', async (_event: IpcMainInvokeEvent) => {
    return selectDirectory()
})