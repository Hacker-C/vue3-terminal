<script setup lang="ts">
const directory = useDirectoryStore()
const execute = () => {
  // 仅处理最多两个参数的命令
  const [simpleCommand, param] = commandInput.value.split(' ')
  switch (simpleCommand) {
    case 'cd':
      if (param === '..') {
        directory.cdBack()
      } else {
        directory.cd(param)
      }
      break
    case 'clear':
      directory.clearShowCommands()
      return void (commandInput.value = '')
    case 'pwd':
      directory.pwd()
      return void (commandInput.value = '')
  }
  directory.addShowCommand(commandInput.value)
  commandInput.value = ''
}

const commandInput = ref('')
const termBody = ref<HTMLElement | null>(null)
onMounted(() => {
  watch(directory.showCommands, async () => {
    await nextTick()
    ;(termBody.value as HTMLElement).scrollIntoView(false)
  })
})
</script>
<template>
  <main class="box-body scrollbar">
    <div ref="termBody">
      <HistoryCommand
        v-for="value of directory.showCommands"
        :key="value"
        :command="value"
      >
        <template #history-command>
          <div class="command-input">{{ value }}</div>
        </template>
      </HistoryCommand>
      <InputCommand
        ref="inputCommandRef"
        v-model="commandInput"
        @keydown.enter="execute"
        :isInput="true"
      >
        <template #show-area>
          <div></div>
        </template>
      </InputCommand>
    </div>
  </main>
</template>
