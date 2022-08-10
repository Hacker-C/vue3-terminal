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
const type = computed(() => {
  if (isValidCommand(command)) {
    if (['ls', 'pwd'].includes(command.split(' ')[0])) {
      return 'info'
    }
    return 'success'
  } else {
    return 'error'
  }
})
</script>

<template>
  <BaseCommand>
    <template #path>
      <div>{{ historyPath }}</div>
    </template>
    <template #history-command>
      <div
        class="pl-5"
        :class="isValidCommand(command!) ?'text-green-500': 'text-red-500' "
      >
        {{ command }}
      </div>
    </template>
    <template #show-area>
      <div class="flex items-center">
        <TermMessage :type="type">{{ type }}</TermMessage>
        <div v-if="command === 'pwd'">{{ currentFullPath }}</div>
        <div v-else-if="command === 'ls'">
          <span>{{ filesAndDirectories[0] }}</span>
          <span class="text-green-500">{{ filesAndDirectories[1] }}</span>
        </div>
        <div v-if="type === 'error'">
          command not found: {{ command.split(' ')[0] }}, type `help` for more.
        </div>
      </div>
      <TermWelcome v-if="command.split(' ')[0] === 'welcome'" />
      <TermHelp v-else-if="command.split(' ')[0] === 'help'" />
    </template>
  </BaseCommand>
</template>
