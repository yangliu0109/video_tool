import { ref } from "vue"
import useConfigStroe from '@renderer/store/useConfigStroe';
import { ElMessage, ElMessageBox } from "element-plus";
import {DataType} from '@renderer/types';

export default () => {
    const newValue = ref('')
    const { config } = useConfigStroe()
    const add = (type: DataType) => {
        config[type == 'size' ? 'sizes' : 'frames'].push(newValue.value)
        ElMessage({message: '添加成功', type: 'success', grouping: true})
        newValue.value = ''
    }

    const remove = async (type: DataType, index: number) => {
        await ElMessageBox.confirm('确认删除吗？')
        config[type == 'size' ? 'sizes' : 'frames'].splice(index, 1)
        ElMessage({message: '删除成功', type: 'error', grouping: true})
    }
    return {newValue, add, remove}
}