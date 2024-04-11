<script setup lang="ts">
import Card from '@renderer/components/Card.vue';
import FrameSizeSet from '@renderer/components/FrameSizeSet.vue';

</script>

<template>
  <main>

    <Card title="分辨率">
      <FrameSizeSet type="size" tip="请设置如：1920x1080格式" placeholder="分辨率" button-style="primary" />
    </Card>

    <Card title="帧数">
      <FrameSizeSet type="frame" tip="请设置如：24" placeholder="帧数" button-style="success" />
    </Card>


  </main>
</template>

<style scoped></style>