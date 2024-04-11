import { IpcMainInvokeEvent, ipcMain } from "electron";
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import path = require("path");
import VideoType from '@/renderer/types'
import { log } from "console";
ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);


export type CompressOptions = {
    file: VideoType,
    fps: number,
    size: string
}

export default class Ffmpeg {
    ffmpeg: ffmpeg.FfmpegCommand
    constructor(
        private _event: IpcMainInvokeEvent,
        private options: CompressOptions
    ) {
        this.ffmpeg = ffmpeg(this.options.file.path)
    }

    processEvent(progress){
        console.log('Processing: ' + progress.percent + '% done');
    }
    error(err){
        console.log('An error occurred: ' + err.message);
    }
    end(){
        console.log('Processing finished !');
    }
    run() {        
        this.ffmpeg
        .fps(this.options.fps)
        .size(this.options.size)
        .videoCodec('libx264')
        .on('error', this.error.bind(this))
        .on('end', this.end.bind(this))
        .on('progress',  this.processEvent.bind(this))
        .save(path.resolve(__dirname, '../../hd-finish.mp4'))
    }
}
