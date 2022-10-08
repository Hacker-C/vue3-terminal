<script setup lang="ts">
const { dir } = useDirectoryStore()
</script>

<template>
  <FolderTree :folder="dir" :index="-1"></FolderTree>
</template>
