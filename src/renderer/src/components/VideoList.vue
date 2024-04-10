<script setup lang="ts">
import { ref } from 'vue';
import {CloseOne} from '@icon-park/vue-next';

const vidoes = ref([1,3,4,4,12,3,1,231,1,1,1,1,1,1])

</script>

<template>
  <main class="overflow-y-auto h-80">
    <section v-for="(video, index) in vidoes" class="video">
     {{ video }}
     <div class="icon">
      <close-one theme="outline" size="12" />
     </div>
    </section>
  </main>
</template>

<style scoped>
.video {
  @apply bg-white px-3 py-1 rounded-lg mb-2 mx-3 text-xs text-slate-600 flex justify-between items-center
}

.icon {
  @apply text-slate-500 opacity-50
   hover:text-yellow-500 hover:opacity-90 hover:scale-125 cursor-pointer
   duration-300
}
</style>