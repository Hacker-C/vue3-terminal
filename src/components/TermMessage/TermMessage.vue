<script setup lang="ts">
interface TermMessageProps {
  type: 'info' | 'error' | 'success' | 'warning'
  showTime?: boolean
}

const { showTime = true } = defineProps<TermMessageProps>()

const MessageToColor = {
  info: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-500',
  error: 'bg-red-700'
}

const getTime = () => new Date().toLocaleTimeString()
</script>

<template>
  <span v-if="showTime" class="pr-3">{{ getTime() }}</span>
  <div
    :class="MessageToColor[type]"
    class="inline-block h-[1.5rem] leading-[1.5rem] pl-1 pr-1 mr-3"
  >
    <slot>default</slot>
  </div>
</template>
