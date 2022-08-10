<script setup lang="ts">
const { currentFullPath } = useDirectoryStore()
</script>

<template>
  <BaseCommand>
    <template #path>
      <div class="">/history/path</div>
    </template>
    <template #history-command>
      <div class="text-green-500 ml-3">hostory command</div>
    </template>
    <template #show-area>
      <div>show area</div>
    </template>
  </BaseCommand>
</template>
