<script setup lang="ts">
const { historyPath, showCommands, currentFullPath } = useDirectoryStore()
const command = showCommands[showCommands.length - 1]
defineExpose<{
  command?: string
}>()
</script>

<template>
  <BaseCommand>
    <template #path>
      <div>{{ historyPath }}</div>
    </template>
    <template #history-command>
      <div class="text-green-500 ml-3">{{ command }}</div>
    </template>
    <template #show-area>
      <div v-if="command === 'pwd'">{{ currentFullPath }}</div>
    </template>
  </BaseCommand>
</template>
