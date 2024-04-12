<script setup lang="ts">
import {CloseOne} from '@icon-park/vue-next';
import {VideoState, VideoType} from '@renderer/types';
import { computed, ref } from 'vue';
import useVideo from '@renderer/composables/useVideo'

const {video} = defineProps<{video: VideoType, index:number}>()
const { remove, bgColor } = useVideo()


</script>

<template>
  <main>
    <section class="video" :style="`--process:${video.progress}%;--bgColor:${bgColor(video)}`">
     <div class="title z-10">{{ video.name }} </div>
     <div class="icon">

      <close-one theme="outline" size="12" @click="remove(index)" />
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
  @apply bg-yellow-500 absolute top-0 bottom-0 left-0 right-0 z-0 rounded-lg;
  width: var(--process);
  /* background-color: var(--bgColor) */
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