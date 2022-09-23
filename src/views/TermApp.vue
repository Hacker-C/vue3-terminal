<script setup lang="ts">
import { Icon } from '@iconify/vue'

const isShow = ref(true) // show or hide
const isOpen = ref(true) // close or open

const openApp = () => {
  isOpen.value = true
  isShow.value = true
}

provide(showKey, () => {
  isShow.value = false
})

provide(closeKey, () => {
  isOpen.value = false
})

const loaded = ref(false)
const show = () => {
  loaded.value = true
}

// setTimeout(() => {
//   show()
// }, 1000)
onMounted(() => {
  window.addEventListener('load', show)
})
onUnmounted(() => {
  window.removeEventListener('load', show)
})
</script>

<template>
  <div v-show="loaded" class="screen">
    <div class="self-start h-screen ml-2 flex flex-col items-center">
      <div @click="openApp" class="flex flex-col items-center">
        <Icon class="w-14 h-14 bg-gray-300" icon="oi:terminal" />
        <p class="text-gray-200 mt-1">Vue3 Terminal</p>
      </div>
    </div>
    <footer class="fixed bottom-0 text-gray-300">
      <a href="https://github.com/Hacker-C/vue3-terminal" target="_blank">
        Hacker-C/vue3-terminal</a
      >
      |
      <a href="https://beian.miit.gov.cn" target="_blank">
        湘ICP备 2022004296号
      </a>
    </footer>
    <TermContainer v-show="isShow" v-if="isOpen" />
  </div>
  <div v-show="!loaded" class="loading-screen">Terminal Loaidng...</div>
</template>

<style scoped>
.screen {
  @apply w-screen h-screen fixed
      flex flex-col-reverse justify-center items-center
      bg-[url('@/assets/images/bg-macos.jpg')] bg-center bg-cover
      pt-2 font-['-apple-system','Helvetica_Neu','Helvetica','Arial','sans-serif','Microsoft_YaHei'];
}

.loading-screen {
  @apply w-screen h-screen bg-black text-white text-xl flex items-center justify-center
  transition-all;
}
</style>
