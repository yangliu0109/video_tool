<script setup lang="ts">
import {CloseOne} from '@icon-park/vue-next';
import {VideoType} from '@renderer/types';
import { ref } from 'vue';
const {video} = defineProps<{video: VideoType }>()
const process = ref(10)
</script>

<template>
  <main>
    <section class="video" :style="`--process:${process}%`">
     <div class="title z-10">{{ video.title }} </div>
     <div class="icon">
      <close-one theme="outline" size="12" />
     </div>
    </section>
  </main>
</template>

<style scoped>
.video {
  @apply bg-white px-3 py-[8px] rounded-lg mb-2 mx-3 text-xs text-slate-600 flex justify-between items-center relative
}

.video::before {
  content:'';
  @apply bg-yellow-400 absolute top-0 bottom-0 left-0 right-0 z-0 rounded-lg;
  width: var(--process)
}

.icon {
  @apply text-slate-500 opacity-50
   hover:text-yellow-500 hover:opacity-90 hover:scale-125 cursor-pointer
   duration-300
}

.title {
  @apply truncate
}
</style>