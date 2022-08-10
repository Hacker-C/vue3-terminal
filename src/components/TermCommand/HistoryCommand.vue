<script setup lang="ts">
const { historyPath, showCommands } = useDirectoryStore()
const command = showCommands[showCommands.length - 1]
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
      <div>show area</div>
    </template>
  </BaseCommand>
</template>
