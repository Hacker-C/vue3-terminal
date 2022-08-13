<script setup lang="ts">
import { Icon } from '@iconify/vue'
const isOpen = ref(true)

provide(closeKey, () => {
  isOpen.value = false
})
</script>

<template>
  <div class="screen">
    <div
      class="self-start h-screen ml-2 flex flex-col items-center"
      @click="isOpen = !isOpen"
    >
      <Icon class="w-14 h-14 bg-gray-300" icon="oi:terminal" />
      <p class="text-gray-200 mt-1">Vue3 Terminal</p>
    </div>
    <TermContainer v-if="isOpen" />
  </div>
</template>

<style scoped>
.screen {
  @apply w-screen h-screen fixed
      flex flex-col-reverse justify-center items-center
      bg-[url('@/assets/images/bg-macos.jpg')] bg-center bg-cover
      pt-2 font-['-apple-system','Helvetica_Neu','Helvetica','Arial','sans-serif','Microsoft_YaHei'];
}
</style>
