<script setup lang="ts">
import type { Command } from '@/store/useDirectoryStore'

const { historyPath, showCommands, currentFullPath, filesAndDirectories } =
  useDirectoryStore()
const { commandStr, isValid, type, description } =
  showCommands[showCommands.length - 1]

defineExpose<{
  command: Command
}>()

const isMessageShow = ref(true)
if (commandStr === '') {
  isMessageShow.value = false
}
</script>

<template>
  <BaseCommand>
    <template #path>
      <div>{{ historyPath }}</div>
    </template>
    <template #history-command>
      <div class="pl-5" :class="isValid ? 'text-green-500' : 'text-red-500'">
        {{ commandStr }}
      </div>
    </template>
    <template #show-area>
      <div class="flex items-center">
        <TermMessage v-if="isMessageShow" :type="type">{{ type }}</TermMessage>
        <div v-if="commandStr === 'pwd'">{{ currentFullPath }}</div>
        <div v-else-if="commandStr === 'ls'">
          <span>{{ filesAndDirectories[0] }}</span>
          <span class="text-green-500">{{ filesAndDirectories[1] }}</span>
        </div>
        <div v-if="description && isMessageShow">{{ description }}</div>
      </div>
      <TermWelcome v-if="commandStr.split(' ')[0] === 'welcome'" />
      <TermHelp v-else-if="commandStr.split(' ')[0] === 'help'" />
    </template>
  </BaseCommand>
</template>
