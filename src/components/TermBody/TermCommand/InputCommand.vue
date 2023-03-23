<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import BaseCommand from './BaseCommand.vue'
import useGlobalFocus from '@/hooks/useGlobalFocus'
import useDirectoryStore from '@/store/useDirectoryStore'

interface Props {
  isInput?: boolean
  modelValue?: string
}

// 设置默认值

const { isInput = false } = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const { currentFullPath } = storeToRefs(useDirectoryStore())
const { isValidCommand } = useDirectoryStore()

// 自定义指令：自动聚焦
const VFocus = {
  mounted: (el: HTMLInputElement) => {
    el.focus()
  }
}

// 一旦按下键盘，自动聚焦到输入
const commandInputRef = ref<HTMLInputElement | null>(null)
watchEffect(() => {
  useGlobalFocus(commandInputRef)
})
</script>

<template>
  <BaseCommand>
    <template #path>
      {{ currentFullPath }}
    </template>
    <template #input-area>
      <input
        v-if="isInput"
        ref="commandInputRef"
        v-focus
        type="text"
        class="command-input"
        :class="{ 'text-green-400': isValidCommand(modelValue!) }"
        :value="modelValue"
        @input="
          emits('update:modelValue', ($event.target! as HTMLInputElement).value)
        "
      >
    </template>
  </BaseCommand>
</template>
