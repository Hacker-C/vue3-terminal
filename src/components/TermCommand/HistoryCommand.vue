<script setup lang="ts">
const {
  historyPath,
  showCommands,
  currentFullPath,
  filesAndDirectories,
  isValidCommand
} = useDirectoryStore()
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
      <div
        class="ml-3"
        :class="isValidCommand(command!) ?'text-green-500': 'text-red-500' "
      >
        {{ command }}
      </div>
    </template>
    <template #show-area>
      <div v-if="command === 'pwd'">{{ currentFullPath }}</div>
      <div v-else-if="command === 'ls'">
        <span>{{ filesAndDirectories[0] }}</span>
        <span class="text-green-500">{{ filesAndDirectories[1] }}</span>
      </div>
    </template>
  </BaseCommand>
</template>
