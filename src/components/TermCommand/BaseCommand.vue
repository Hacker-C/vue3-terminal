<script setup lang="ts">
interface Props {
  modelValue?: string
}
defineProps<Props>()
</script>

<template>
  <div class="pt-2 pl-2 pr-2 text-lg">
    <div class="text-[#00afff]">
      <slot name="path"></slot>
    </div>
    <div class="flex items-center">
      <span class="text-lg font-bold text-[#881798]">❯</span>
      <slot name="history-command"></slot>
      <slot name="input-area"></slot>
    </div>
    <slot name="show-area">
      <div></div>
    </slot>
  </div>
</template>
