<script setup lang="ts">
import FolderTree from './FolderTree.vue'
import useDirectoryStore from '@/store/useDirectoryStore'

const { dir } = useDirectoryStore()
</script>

<template>
  <FolderTree :folder="dir" :index="-1" />
</template>
