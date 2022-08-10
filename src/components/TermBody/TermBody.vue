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
      commandInput.value = ''
      return void directory.clearShowCommands()
    case 'pwd':
      directory.pwd()
      break
    case 'ls':
      directory.ls()
      break
    case 'mkdir':
      directory.mkdir(param)
      break
    case 'touch':
      directory.touch(param)
      break
    case 'welecome':
    case 'help':
      break
    default:
      directory.setHistoryPath()
  }
  directory.addShowCommand(commandInput.value)
  start = directory.showCommands.length - 1
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

// 实现上下键 pageup pagedown 点击切换历史命令
let start = 0
const goToHistoryCommand = (keyName: string) => {
  if (directory.showCommands.length === 0) {
    return
  }
  if (start < 0 || start > directory.showCommands.length - 1) {
    start = directory.showCommands.length - 1
  }
  if (keyName === 'ArrowUp') {
    commandInput.value = directory.showCommands[start--]
  } else {
    commandInput.value = directory.showCommands[start++]
  }
}
useAddEventListener(document, 'keydown', ((e: KeyboardEvent) => {
  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    goToHistoryCommand(e.key)
  }
  // eslint-disable-next-line no-undef
}) as EventListener)
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
