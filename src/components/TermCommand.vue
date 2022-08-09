<script setup lang="ts">
defineProps<{
  curDir: string,
  isInput: boolean
}>()
const VFocus = {
  mounted:(el:HTMLInputElement)=> {
    el.focus()
  }
}
</script>

<template>
  <div class="pt-2 pl-2 pr-2 text-lg">
    <div class="text-[#00afff] ">{{curDir}}</div>
    <div class="flex items-center">
      <span class="text-lg font-bold text-[#881798]">❯</span>
      <input v-if="isInput" type="text" class="command-input" v-focus />
      <div class="command-input" v-else>not input</div>
    </div>
    <div v-if="!isInput">输出信息</div>
  </div>
</template>
