<script setup lang="ts">
const directory = useDirectoryStore()
const isWelcomeShow = ref(true)
const execute = () => {
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
      isWelcomeShow.value = false
      directory.clearShowCommands()
      return void (commandInput.value = '')
    case 'pwd':
      directory.pwd()
      return void (commandInput.value = '')
    case 'ls':
      directory.ls()
      return void (commandInput.value = '')
    case 'mkdir':
      directory.mkdir(param)
      return void (commandInput.value = '')
    case 'touch':
      directory.touch(param)
      return void (commandInput.value = '')
    case 'welecome':
      directory.addShowCommand(commandInput.value)
      return void (commandInput.value = '')
    case 'help':
      directory.addShowCommand(commandInput.value)
      return void (commandInput.value = '')
    default:
      directory.setHistoryPath()
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
      <TermWelcome v-show="isWelcomeShow" />
      <!-- 历史命令区域 HistoryCommand -->
      <HistoryCommand
        v-for="value of directory.showCommands"
        :key="value"
        :command="value"
      >
        <template #history-command>
          <div class="command-input">{{ value }}</div>
        </template>
      </HistoryCommand>
      <!-- 命令输入框区域 InputCommand -->
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
