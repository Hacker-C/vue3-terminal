<script setup lang="ts">
const curDir = ref('/home/murphy')
const count = ref(0)
const increment = () => {
  count.value++
}
</script>
<template>
  <main class="box-body">
    <button @click="increment">add</button>
    <TermCommand
      :curDir="curDir"
      v-for="i of count"
      :key="i"
      :isInput="i === count"
    />
  </main>
</template>
