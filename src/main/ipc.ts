import { IpcMainInvokeEvent, ipcMain } from "electron";
import Ffmpeg, {CompressOptions} from "./ffmpeg";

ipcMain.handle('compress', async (_event: IpcMainInvokeEvent, options: CompressOptions) => {
    const compress = new Ffmpeg(_event, options)
})