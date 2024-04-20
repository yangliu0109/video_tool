import { ElMessage, UploadRequestOptions } from 'element-plus';
import useConfigStroe from '@renderer/store/useConfigStroe';
import { VideoState, VideoType } from '@renderer/types';


export default () => { 
    
    const {config} = useConfigStroe()
    const addFile = (options: UploadRequestOptions) => {
        const name = options.file.name
        const path = options.file.path
        config.files.push({name, path, progress: 0, state: VideoState.READY})
    }

    const remove = async (index:number) => {
        try {
            if(config.files[index].state === VideoState.RUN) {
                ElMessage.warning('请等待视频压缩完成')
                return
            }            
            // await ElMessageBox.confirm('确定删除吗？')
            config.files.splice(index, 1)
        } catch (error) {
        }
    }

    const removeAll = () => {
        config.files = []
    }

    const resetAll = () => {
        config.files.forEach(item => {
            item.progress = 0;
            item.state = VideoState.READY;
        })
    }

    const bgColor = (video: VideoType) => {
        return {
          [VideoState.RUN]: '#F9F871',
          [VideoState.ERROR]: '#F3A683',
          [VideoState.FINNISH]: '#4FFBDF'
        } [video.state]
      }
    return {addFile, remove, removeAll,bgColor, resetAll}
}