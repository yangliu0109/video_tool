<script setup lang="ts">
import { ref } from 'vue';
import useConfigStroe from '@renderer/store/useConfigStroe';

const { config } = useConfigStroe()
const frame = ref(60)
</script>

<template>
  <main class="bg-white p-3 flex gap-2">

    <el-select v-model="config.size">
        <el-option v-for="(item, index) in config.sizes" :key="index" :label="item" :value="item">
        </el-option>
    </el-select>

    <el-select v-model="config.frame">
        <el-option v-for="(item, index) in config.frames" :key="index" :label="item" :value="item">
        </el-option>
    </el-select>
 
  </main>
</template>

<style>

</style>