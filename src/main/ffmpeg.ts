import { BrowserWindow, IpcMainInvokeEvent, ipcMain } from "electron";
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import path = require("path");
import VideoType from '@/renderer/types'
import CompressOptions from '@/renderer/types'
ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

export default class Ffmpeg {
    ffmpeg: ffmpeg.FfmpegCommand
    window: BrowserWindow
    constructor(
        private _event: IpcMainInvokeEvent,
        private options: CompressOptions
    ) {
        this.ffmpeg = ffmpeg(this.options.file.path)
        this.window = BrowserWindow.fromWebContents(this._event.sender)!
    }

    processEvent(progress){
        this.window.webContents.send('progressNotice', progress.percent)
        // console.log('Processing: ' + progress.percent + '% done');
    }
    error(err){
        console.log('An error occurred: ' + err.message);
    }
    end(){
        console.log('Processing finished !');
    }

    private getSaveFilePath() {
        const info = path.parse(this.options.file.name)
        return path.join(this.options.saveDirectory, info.name + '_' + this.options.size + '_' + this.options.fps + info.ext)
    }
    run() {        
        this.ffmpeg
        .fps(this.options.fps)
        .size(this.options.size)
        .videoCodec('libx264')
        .on('error', this.error.bind(this))
        .on('end', this.end.bind(this))
        .on('progress',  this.processEvent.bind(this))
        .save(this.getSaveFilePath())
    }
}
