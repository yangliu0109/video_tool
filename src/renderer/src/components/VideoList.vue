<script setup lang="ts">
import VideoItem from '@renderer/components/VideItem.vue'
import useConfigStroe from '@renderer/store/useConfigStroe';

const {config} = useConfigStroe()
</script>

<template>
  <main class="overflow-y-auto h-80">
    <VideoItem v-for="(video, index) in config.files" :video="video" :index="index"v-if="config.files.length"/>
    <div class="text-xs opacity-80 text-slate-600 text-center">
      暂无视频压缩
    </div>
  </main>
</template>

<style scoped>

</style>