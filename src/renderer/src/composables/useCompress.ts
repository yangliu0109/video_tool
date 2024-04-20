import useConfigStroe from "@renderer/store/useConfigStroe"
import { VideoState, VideoType } from "@renderer/types"
import { ElMessage } from "element-plus"
import { ref } from "vue"
const isRun = ref<Boolean>()

export default () => {
  const { config } = useConfigStroe()

  const video = ref<VideoType>()
  const getCompressFile = () => {
    // return config.files[0]
    video.value = config.files.find((video) => video.state == VideoState.READY)
    if (video.value) {
      video.value.state = VideoState.RUN;
      return true;
    } else {
      ElMessage.warning({message: '视频压缩完毕', duration: 3000, grouping: true})
      return false;
    }
  }

  const progressNotice = () => {
    window.api.mainProcessNotice((type: 'end' | 'progress' | 'error' | 'directoryCheck'  | 'stop', data: any) => {
      switch(type) {
        case 'end':
          video.value!.progress = 100
          video.value!.state = VideoState.FINNISH
          isRun.value = false
          compress();
          break;
        case 'progress':
          console.log('progress!!');
          
          video.value!.progress = data
          break;
        case 'error':
          break;
        case 'directoryCheck': 
          video.value!.state = VideoState.READY
          ElMessage.warning({message: data, duration: 3000, grouping: true})
          break;
        case 'stop': 
          isRun.value = false
          video.value!.state = VideoState.READY
          video.value!.progress = 0
          break;
      }
    })
  }

  const compress = () => {
    if(!getCompressFile()) return
    isRun.value = true;    
    window.api.compress({
      file: { ...video.value },
      size: config.size,
      fps: config.frame,
      saveDirectory: config.videoSaveDirectory
    })
  }

  const stop = () => {

    window.api.stop()
  }

  return { compress, isRun ,progressNotice, stop}
}