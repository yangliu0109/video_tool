import { ref } from "vue"
import useConfigStroe from '@renderer/store/useConfigStroe';
import { ElMessage, ElMessageBox } from "element-plus";
import {DataType} from '@renderer/types';

export default () => {
    const newValue = ref('')
    const { config } = useConfigStroe()
    const add = (type: DataType) => {
        let message = ''
        switch(type) {
            case 'size': {
                if(!/^\d+x\d+$/.test(newValue.value)) message = '分辨率尺寸错误'
                break;
            }
            case 'frame': {
                if(!/^\d+$/.test(newValue.value)) message = '帧数错误'
                break;
            }
        }
        if(message) ElMessage.error({grouping: true, message})
        else  ElMessage({message: '添加成功', type: 'success', grouping: true})
        config[type == 'size' ? 'sizes' : 'frames'].push(newValue.value)
        newValue.value = ''
    }

    const remove = async (type: DataType, index: number) => {
        await ElMessageBox.confirm('确认删除吗？')
        config[type == 'size' ? 'sizes' : 'frames'].splice(index, 1)
        ElMessage({message: '删除成功', type: 'error', grouping: true})
    }
    return {newValue, add, remove}
}