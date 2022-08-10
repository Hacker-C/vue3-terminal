<template>
  <header class="box-header">
    <div class="circle-container">
      <span class="circle bg-red-600"></span>
      <span class="circle bg-yellow-400"></span>
      <span class="circle bg-green-500"></span>
    </div>
    <div class="center-dir-title">
      <Icon icon="ant-design:folder-filled" class="text-[#57c5ff]" />
      <span class="ml-2">{{ currentDirName }}</span>
    </div>
    <div class="circle-container"></div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { currentDirName } = useDirectoryStore()
</script>
