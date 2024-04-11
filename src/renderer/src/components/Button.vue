<script setup lang="ts">
import useVideo from '@renderer/composables/useVideo';

const {removeAll} = useVideo()
</script>

<template>
  <main class="flex justify-center">
    <el-button type="primary" size="small" @click="">停止转码</el-button>
    <el-button type="danger" size="small" @click="removeAll">全部删除</el-button>
  </main>
</template>

<style>

</style>