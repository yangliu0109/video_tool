import { ElectronAPI } from '@electron-toolkit/preload'
import CompressOptions from '@/renderer/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress: (options: CompressOptions) => void,
      selectDirectory: () => Promise<any>,
      stop: () => void,
      // progressNotice: (callback: (progress:numbre) => void) => void
      mainProcessNotice:  (callback: (type: 'end' | 'progress' | 'error' | 'directoryCheck' | 'stop', options: any, path: string) => void) => void
    }
  }
}
