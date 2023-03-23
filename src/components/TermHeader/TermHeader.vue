<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { inject } from 'vue'
import useDirectoryStore from '@/store/useDirectoryStore'
import { closeKey, fullScreenKey, showKey } from '@/utils/provide-inject_keys'

const { currentDirName } = storeToRefs(useDirectoryStore())

// close TermApp, distroy the component
// TODO init whole state
const close = inject<() => void>(closeKey)

// show or hide the TermApp
const show = inject<() => void>(showKey)

// fullscreen and exit fullscreen
const toggle = inject<() => void>(fullScreenKey)
</script>

<template>
  <!-- 终端顶部区域 -->
  <header class="box-header">
    <div class="circle-container">
      <div class="circle bg-red-600" @click="close">
        <Icon class="circle-icon" icon="ep:close-bold" />
      </div>
      <div class="circle bg-yellow-400" @click="show">
        <Icon class="circle-icon" icon="akar-icons:minus" />
      </div>
      <div class="circle bg-green-500" @click="toggle">
        <Icon class="circle-icon" icon="fa-solid:expand-arrows-alt" />
      </div>
    </div>
    <div class="center-dir-title">
      <Icon icon="ant-design:folder-filled" class="text-[#57c5ff]" />
      <span class="ml-2 select-none">{{ currentDirName }}</span>
    </div>
    <div class="circle-container" />
  </header>
</template>
