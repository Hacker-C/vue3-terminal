<script setup lang="ts">
interface Props {
  isInput?: boolean
  modelValue?: string
}

const { currentFullPath } = storeToRefs(useDirectoryStore())

// 设置默认值
// eslint-disable-next-line vue/no-setup-props-destructure
const { isInput = false } = defineProps<Props>()

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

const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <BaseCommand>
    <template #path>
      {{ currentFullPath }}
    </template>
    <template #input-area>
      <input
        v-if="isInput"
        type="text"
        class="command-input"
        v-focus
        ref="commandInputRef"
        :value="modelValue"
        @input="
          emits('update:modelValue', ($event.target! as HTMLInputElement).value)
        "
      />
    </template>
  </BaseCommand>
</template>
