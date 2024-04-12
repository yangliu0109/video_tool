<script setup lang="ts">
import Card from '@renderer/components/Card.vue';
import FrameSizeSet from '@renderer/components/FrameSizeSet.vue';
import useConfigStroe from '@renderer/store/useConfigStroe';

const {config} = useConfigStroe()
const selectDirectory = async () => {
  const directory = await window.api.selectDirectory()
  if(directory) config.videoSaveDirectory = directory
}
</script>

<template>
  <main>

    <Card title="分辨率">
      <FrameSizeSet type="size" tip="请设置如：1920x1080格式" placeholder="分辨率" button-style="primary" />
    </Card>

    <Card title="帧数">
      <FrameSizeSet type="frame" tip="请设置如：24" placeholder="帧数" button-style="success" />
    </Card>

    <Card title="视频保存目录">
      <div class="flex gap-1">
        <el-input v-model="config.videoSaveDirectory" disabled placeholder="" size="normal" clearable @change=""></el-input>
        <el-button type="primary" size="default" @click="selectDirectory">选择</el-button>
      </div>
    </Card>
  </main>
</template>

<style scoped></style>