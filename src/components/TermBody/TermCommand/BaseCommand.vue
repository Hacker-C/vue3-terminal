<script setup lang="ts">
interface Props {
  modelValue?: string
}
defineProps<Props>()
</script>

<template>
  <!-- 
      基础组件：BaseCommand
      InputCommand 和 HistoryCommand 基于本组件
  -->
  <div class="pt-3 pr-5">
    <div class="text-[#00afff] flex items-center">
      <Icon icon="bi:apple" class="mr-2 mb-1" />
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

<script lang="ts">
import { Icon } from '@iconify/vue'
</script>
