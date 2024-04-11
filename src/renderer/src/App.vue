<script setup lang="ts">
import NavBar from '@renderer/components/NavBar.vue'
import Copyright from '@renderer/components/Copyright.vue';

</script>

<template>
  <main class="text">
    <NavBar />
    <RouterView/>
    <Copyright class="mt-2"/>
  </main>
</template>

<style>

</style>