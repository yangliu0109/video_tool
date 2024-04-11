import { IpcMainInvokeEvent, ipcMain } from "electron";
import Ffmpeg, {CompressOptions} from "./ffmpeg";

ipcMain.handle('compress', async (_event: IpcMainInvokeEvent, options: CompressOptions) => {
    console.log(options);
    const compress = new Ffmpeg(_event, options);
    compress.run();
})