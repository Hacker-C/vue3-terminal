<script setup lang="ts">
import { Icon } from '@iconify/vue'

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
      <Icon icon="uim:vuejs" class="mr-2 w-5 h-5 text-[#42b883]" />
      <slot name="path" />
    </div>
    <div class="flex items-center">
      <span class="text-lg font-bold text-[#881798]">❯</span>
      <slot name="history-command" />
      <slot name="input-area" />
    </div>
    <slot name="show-area">
      <div />
    </slot>
  </div>
</template>
