<script setup lang="ts">
import { Icon } from '@iconify/vue'
const isOpen = ref(true)

provide(closeKey, () => {
  isOpen.value = false
})
</script>

<template>
  <div class="screen">
    <div class="self-start h-screen ml-2 flex flex-col items-center">
      <div @click="isOpen = !isOpen" class="flex flex-col items-center">
        <Icon class="w-14 h-14 bg-gray-300" icon="oi:terminal" />
        <p class="text-gray-200 mt-1">Vue3 Terminal</p>
      </div>
    </div>
    <footer class="fixed bottom-0 text-gray-300">
      <a href="https://github.com/Hacker-C/vue3-terminal" target="_blank">
        MurphyChen's resume</a
      >
      |
      <a href="https://beian.miit.gov.cn" target="_blank"
        >湘ICP备 2022004296号</a
      >
    </footer>
    <TermContainer v-show="isOpen" />
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
