<script setup lang="ts">
import {Plus, UpdateRotation} from '@icon-park/vue-next';
import useVideo from '@renderer/composables/useVideo'
import useComporess from '@renderer/composables/useCompress';

const {compress} = useComporess()
const {addFile} = useVideo()
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
            <update-rotation @click="compress" theme="outline" size="42" fill="#333"/>
        </div>
    </section>
  </main>
</template>

<style scoped>
.button {
    @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600
}

:deep(.el-upload-dragger) {
  padding: 0 !important;
  border: none !important;
}
</style>