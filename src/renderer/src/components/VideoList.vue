<script setup lang="ts">
import { ref } from 'vue';
import VideoItem from '@renderer/components/VideItem.vue'

const vidoes = ref(['1,3,4,4,12,3,1,231,1,1,1,1,1,1,4,12,3,1,231,1,1,,4,12,3,1,231,1,1,,4,12,3,1,231,1,1,,4,12,3,1,231,1,1,','1,231,1,1,1,1,1,1,4,12,3,1,231,1,1,,4,12,3,1,231,1,1,,4,12,3,1,231,1,1,,4,12,3,1,2'])

</script>

<template>
  <main class="overflow-y-auto h-80">
    <VideoItem v-for="(video, index) in vidoes" :video="{title: video}"/>
  </main>
</template>

<style scoped>

</style>