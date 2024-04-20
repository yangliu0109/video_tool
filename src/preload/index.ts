import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {CompressOptions} from '../renderer/src/types'

// Custom APIs for renderer
const api = {
  compress: (options: CompressOptions) => {
    ipcRenderer.invoke('compress', options)
  },
  selectDirectory: () => {
    return ipcRenderer.invoke('selectDirectory')
  },
  // progressNotice: (callback: (prgress: number) => void) => {
  //   ipcRenderer.on('progressNotice', (_event: IpcRendererEvent, prgress: number) => {
  //     callback(prgress)
  //   })
  // },
  mainProcessNotice: (callback: (type: 'end' | 'progress' | 'error' | 'directoryCheck'  | 'stop', options: any) => void) => {
    ipcRenderer.on('mainProcessNotice', (_event: IpcRendererEvent, type: 'end' | 'progress' | 'error' | 'directoryCheck'  | 'stop', options: any) => {
      callback(type, options)
    })
  },
  stop: () => {
    ipcRenderer.invoke('stop')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
