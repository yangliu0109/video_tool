<script setup lang="ts">
import NavBar from '@renderer/components/NavBar.vue'
import Copyright from '@renderer/components/Copyright.vue';

const compress = () => {
  window.api.compress({
    file: 'C:\\Users\\njsy\\Videos\\QQ录屏20240411175323.mp4',
    size: '1920x1080',
    fps: 60
  })
}
</script>

<template>
  <main class="text">
    <NavBar />
    <RouterView/>
    <Copyright class="mt-2"/>
    <el-button @click="compress">压缩</el-button>
  </main>
</template>

<style>

</style>