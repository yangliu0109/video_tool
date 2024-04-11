import { ElMessageBox, UploadRequestOptions } from 'element-plus';
import useConfigStroe from '@renderer/store/useConfigStroe';


export default () => {
    
    const {config} = useConfigStroe()
    const addFile = (options: UploadRequestOptions) => {
        const name = options.file.name
        const path = options.file.path
        config.files.push({name, path, progress: 30, finish: false})
    }

    const remove = async (index:number) => {
        try {
            console.log(index);
            
            // await ElMessageBox.confirm('确定删除吗？')
            config.files.splice(index, 1)
        } catch (error) {
        }
    }

    const removeAll = () => {
        config.files = []
    }
    return {addFile, remove, removeAll}
}