<script setup lang="ts">

</script>

<template>
  <main class="text-slate-600 border-b bg-gray-50 text-xs flex justify-between px-3 py-2 drag">
    <section class="opacity-80">XD作品</section>
    <section class="flex justify-between gap-2">
        <router-link class="nodrag" :to="{name: 'home'}">转码</router-link>
        <router-link class="nodrag"  :to="{name: 'setting'}">配置</router-link>
    </section>
  </main>
</template>

<style>

</style>