<script setup lang="ts">
import TermMessage from '@/components/TermMessage.vue'
import useDirectoryStore from '@/store/useDirectoryStore'

const { commandHelp } = useDirectoryStore()
</script>

<template>
  <div v-for="item of commandHelp" :key="item[0]">
    <TermMessage type="success" :show-time="false">
      {{ item[0] }}
    </TermMessage>
    <span>------- {{ item[1] }}</span>
  </div>
</template>
