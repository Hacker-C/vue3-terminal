<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import TermWelcome from '../common/TermWelcome.vue'
import HistoryCommand from './TermCommand/HistoryCommand.vue'
import InputCommand from './TermCommand/InputCommand.vue'
import useDirectoryStore from '@/store/useDirectoryStore'
import useAddEventListener from '@/hooks/useAddEventListener'

const directory = useDirectoryStore()
const isWelcomeShow = ref(true)

const commandInput = ref('')
let start = 0

// 执行指令
const execute = () => {
  const commandStr = commandInput.value.trim()
  const simpleCommand = commandStr.split(' ')[0]
  if (simpleCommand === 'clear') {
    isWelcomeShow.value = false
    commandInput.value = ''
    return directory.clearShowCommands()
  }
  // prettier-ignore
  // 这里不加 prettier-ignore，用不了分号，无法隔离上下文，vsc 高亮丢失
  type Options = keyof typeof directory
  if (directory[simpleCommand as Options]) {
    (directory[simpleCommand as Options] as (...args: unknown[]) => unknown)(commandStr)
  } else {
    directory.handleOther(commandStr)
  }
  start = directory.showCommands.length - 1
  commandInput.value = ''
}

const termBody = ref<HTMLElement | null>(null)
onMounted(() => {
  watch(directory.showCommands, async () => {
    await nextTick()
    ;(termBody.value as HTMLElement).scrollIntoView(false)
  })
})

// 实现上下键 pageup pagedown 点击切换历史命令
const goToHistoryCommand = (keyName: string) => {
  if (directory.showCommands.length === 0) {
    return
  }
  if (start < 0 || start > directory.showCommands.length - 1) {
    start = directory.showCommands.length - 1
  }
  if (keyName === 'ArrowUp') {
    commandInput.value = directory.showCommands[start--].commandStr
  } else {
    commandInput.value = directory.showCommands[start++].commandStr
  }
}
useAddEventListener(document, 'keydown', ((e: KeyboardEvent) => {
  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    goToHistoryCommand(e.key)
  }
}) as EventListener)
</script>

<template>
  <main class="box-body scrollbar">
    <div ref="termBody">
      <TermWelcome v-show="isWelcomeShow" />
      <!-- 历史命令区域 HistoryCommand -->
      <HistoryCommand
        v-for="command of directory.showCommands"
        :key="command.commandStr"
        :command="command"
      >
        <template #history-command>
          <div class="command-input">
            {{ command.commandStr }}
          </div>
        </template>
      </HistoryCommand>
      <!-- 命令输入框区域 InputCommand -->
      <InputCommand
        v-model="commandInput"
        :is-input="true"
        @keydown.enter="execute"
      >
        <template #show-area>
          <div />
        </template>
      </InputCommand>
    </div>
  </main>
</template>
