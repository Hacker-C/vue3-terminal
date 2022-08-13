<script setup lang="ts">
const { commandHelp } = useDirectoryStore()
</script>

<template>
  <div v-for="item of commandHelp" :key="item[0]">
    <TermMessage type="success" :showTime="false">{{ item[0] }}</TermMessage>
    <span>------- {{ item[1] }}</span>
  </div>
</template>
