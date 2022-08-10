<script setup lang="ts">
import useGlobalFocus from '@/hooks/useGlobalFocus'

interface Props {
  curDir: string
  isInput?: boolean
  value?: string
}
// eslint-disable-next-line vue/no-setup-props-destructure
const { isInput = false, curDir, value } = defineProps<Props>()

const VFocus = {
  mounted: (el: HTMLInputElement) => {
    el.focus()
  }
}

const commandInputRef = ref<HTMLInputElement | null>(null)
watchEffect(() => {
  useGlobalFocus(commandInputRef)
})

defineExpose({
  commandInputRef
})
</script>

<template>
  <div class="pt-2 pl-2 pr-2 text-lg">
    <div class="text-[#00afff]">{{ curDir }}</div>
    <div class="flex items-center">
      <span class="text-lg font-bold text-[#881798]">❯</span>
      <input
        v-if="isInput"
        type="text"
        class="command-input"
        v-focus
        ref="commandInputRef"
      />
      <div class="command-input" v-else>not input</div>
    </div>
    <div v-if="!isInput">{{ value }}</div>
  </div>
</template>
