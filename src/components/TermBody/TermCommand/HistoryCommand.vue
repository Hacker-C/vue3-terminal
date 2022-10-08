<script setup lang="ts">
import type { Command } from '@/store/useDirectoryStore'

const { historyPath, showCommands, filesAndDirectories } = useDirectoryStore()
const { commandStr, isValid, type, description } =
  showCommands[showCommands.length - 1]

const [files, directories] = filesAndDirectories()

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
      <TermMessage v-if="isMessageShow" :type="type">{{ type }}</TermMessage>
      <div v-if="commandStr === 'ls'" class="break-words">
        <span>{{ files }}</span>
        <span class="text-green-500">{{ directories }}</span>
      </div>
      <div v-if="description && isMessageShow" class="break-words">
        {{ description }}
      </div>
      <TermWelcome v-if="commandStr.split(' ')[0] === 'welcome'" />
      <TermHelp v-else-if="commandStr.split(' ')[0] === 'help'" />
      <RootTree v-else-if="commandStr.split(' ')[0] === 'tree'" />
    </template>
  </BaseCommand>
</template>
