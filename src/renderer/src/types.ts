export type DataType = 'frame' | 'size'

export enum VideoState {
    READY = 'ready',
    RUN = 'run',
    ERROR = 'error',
    FINNISH = 'finish'
}

export type VideoType = {
    name: string,
    path: string,
    progress: number,
    state: VideoState
}

export type CompressOptions = {
    file: VideoType,
    fps: number,
    size: string,
    saveDirectory: string
}