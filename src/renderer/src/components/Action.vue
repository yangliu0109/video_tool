<script setup lang="ts">
import {Plus, UpdateRotation} from '@icon-park/vue-next';

</script>

<template>
  <main class="">
    <section class="flex justify-center gap-2">
        <div class="button">
            <plus theme="outline" size="42" fill="#333"/>
        </div>
        <div class="button">
            <update-rotation theme="outline" size="42" fill="#333"/>
        </div>
    </section>
  </main>
</template>

<style scoped>
.button {
    @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600
}
</style>