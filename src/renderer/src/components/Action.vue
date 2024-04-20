<script setup lang="ts">
import {Plus, UpdateRotation} from '@icon-park/vue-next';
import useVideo from '@renderer/composables/useVideo'
import useComporess from '@renderer/composables/useCompress';

const {compress, isRun, progressNotice} = useComporess()
const {addFile} = useVideo()
progressNotice();

</script>

<template>
  <main class="">
    <section class="flex justify-center gap-2">
        <div class="button">
          <el-upload
          class="flex items-center"
            multiple
            :http-request="addFile"
            action="#"
            drag
            ref="upload"
            :show-file-list="false"
            accept="video/*"
          >
          <plus theme="outline" size="42" fill="#333"/>
          </el-upload>
        </div>
        <div class="button">
            <update-rotation @click="compress" :class="{'run': isRun}" theme="outline" size="42"/>
        </div>
    </section>
  </main>
</template>

<style scoped>
.run {
  @apply animate-spin cursor-wait text-slate-300
}
.button {
    @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600
}

:deep(.el-upload-dragger) {
  padding: 0 !important;
  border: none !important;
}
</style>