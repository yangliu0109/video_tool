import { BrowserWindow, IpcMainInvokeEvent } from "electron";
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import path from "path";
import {CompressOptions} from '../renderer/src/types'
import { existsSync } from "fs";
ffmpeg.setFfmpegPath(ffmpegPath.path.replace('app.asar', 'app.asar.unpacked'))
ffmpeg.setFfprobePath(ffprobePath.path.replace('app.asar', 'app.asar.unpacked'))

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
        this.window.webContents.send('mainProcessNotice', 'progress', progress.percent, this.options.file.path)
        console.log(progress);
    }
    error(err){
        
        console.log('An error occurred: ' + err.message);
    }
    end(){
        this.window.webContents.send('mainProcessNotice', 'end','' ,this.options!.file.path)
        console.log('Processing finished !');
    }

    stop(){
        try {
            this.ffmpeg.kill('SIGKILL')
            this.window.webContents.send('mainProcessNotice', 'stop','' ,this.options!.file.path)
            console.log('Processing stop !');
        } catch (error) {
            
        }
       
    }

    private getSaveFilePath() {
        const info = path.parse(this.options.file.name)
        return path.join(this.options.saveDirectory, info.name + '_' + this.options.size + '_' + this.options.fps + info.ext)
    }
    
    vaildDirecroty() {
        if(existsSync(this.options.saveDirectory)) return true;
        else return false;
    }

    run() {        
        if(!this.vaildDirecroty()){
            this.window.webContents.send('mainProcessNotice', 'directoryCheck', '目录不存在')
            return;
        }
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
