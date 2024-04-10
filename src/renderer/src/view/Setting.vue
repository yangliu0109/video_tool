<script setup lang="ts">
import { ref } from 'vue';

const sizes = ref(['1920x1080', '1024x720'])
const size = ref('1920x1080')

const frames = ref([60, 30])
const frame = ref(60)
</script>

<template>
  <main class="bg-white p-3 flex gap-2">

    <section>
        <h2>分辨率</h2>
        <el-select v-model="size">
        <el-option v-for="(item, index) in sizes" :key="index" :label="item" :value="item">
        </el-option>
    </el-select>
    </section>
  

    <!-- <el-select v-model="frame">
        <el-option v-for="(item, index) in frames" :key="index" :label="item" :value="item">
        </el-option>
    </el-select> -->
 
  </main>
</template>

<style scoped>

</style>