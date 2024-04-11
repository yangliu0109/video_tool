<script setup lang="ts">
import {computed, ref} from 'vue'
import useConfigStroe from '@renderer/store/useConfigStroe';
import useFps from '@renderer/composables/useFps';
import DataType from '@renderer/types';
import {CloseOne} from '@icon-park/vue-next';

const { config } = useConfigStroe()
interface Prop {
  type: DataType,
  placeholder?: string,
  buttonStyle?: 'danger' | 'primary' | 'success',
  tip?: string
}
const props = defineProps<Prop>()
const list = computed(() => {
  return props.type == 'size' ? config.sizes : config.frames
})

const {add, newValue, remove} = useFps();
</script>

<template>
  <main>
    <el-select :placeholder="props.placeholder">
        <el-option v-for="(item, index) in list" :key="index" :label="item" :value="item">
          <div class="flex items-center justify-between" >
            {{ item }}
           <div class="delIcon" @click="remove(props.type, index)" v-if="index > 1">
            <close-one theme="outline" size="15" />
           </div>
          </div>
        </el-option>
      </el-select>
      <div class="flex gap-1 mt-2 items-center">
        <el-input v-model="newValue" :placeholder="props.tip" size="normal" clearable @change=""></el-input>
        <el-button :type="props.buttonStyle" size="default" @click="add(props.type)">增加</el-button>
      </div>
  </main>
</template>

<style scoped>
  .delIcon {
    @apply text-slate-300 hover:text-red-500 hover:scale-125 cursor-pointer duration-300
  }
</style>@renderer/composables/useFps