import useConfigStroe from "@renderer/store/useConfigStroe"
import { VideoState, VideoType } from "@renderer/types"
import { ref } from "vue"

export default () => {
  const { config } = useConfigStroe()

  const video = ref<VideoType>()
  const getCompressFile = () => {
    // return config.files[0]
    video.value = config.files.find((video) => video.state == VideoState.READY)
    if (video.value) video.value.state = VideoState.RUN
  }

  const compress = () => {
    progressNotice();
    getCompressFile()
    window.api.compress({
      file: { ...video.value },
      size: config.size,
      fps: config.frame,
      saveDirectory: config.videoSaveDirectory
    })
  }

  const progressNotice = () => {
    window.api.progressNotice((progress: number) => {
      video.value!.progress = progress

    })
  }

  return { compress }
}