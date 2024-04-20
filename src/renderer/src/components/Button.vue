<script setup lang="ts">
import useVideo from '@renderer/composables/useVideo';
import useComporess from '@renderer/composables/useCompress';

const {isRun, stop} = useComporess()
const {removeAll, resetAll} = useVideo()
</script>

<template>
  <main class="flex justify-center">
    <el-button type="primary" size="small" @click="stop">停止转码</el-button>
    <el-button type="danger" size="small" :disabled="isRun" @click="removeAll">全部删除</el-button>
    <el-button type="warning" size="small" :disabled="isRun" @click="resetAll">重置视频</el-button>
  </main>
</template>

<style>

</style>