<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { provide, ref } from 'vue'
import TermContainer from './TermContainer.vue'
import { closeKey, showKey } from '@/utils/provide-inject_keys'

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
</script>

<template>
  <div class="screen bg-color">
    <div class="self-start h-screen ml-2 flex flex-col items-center">
      <div class="flex flex-col items-center" @click="openApp">
        <Icon class="w-14 h-14 bg-gray-300" icon="oi:terminal" />
        <p class="text-gray-200 mt-1">
          Vue3 Terminal
        </p>
      </div>
    </div>
    <TermContainer v-show="isShow" v-if="isOpen" />
  </div>
</template>

<style scoped>
.bg-color {
  background: rgb(200, 110, 161);
  background: linear-gradient(
    119deg,
    rgba(200, 110, 161, 1) 3%,
    rgba(175, 61, 200, 1) 22%,
    rgba(77, 23, 171, 1) 100%
  );
}

.screen {
  @apply w-screen h-screen fixed
      flex flex-col-reverse justify-center items-center
      bg-center bg-cover pt-2 font-['-apple-system','Helvetica_Neu','Helvetica','Arial','sans-serif','Microsoft_YaHei'];
}
</style>
