<script setup lang="ts">
const curDir = ref('/home/murphy')
const count = ref<string[]>(Array(4).fill('aaa'))
const increment = () => {
  count.value.push(Math.random() + '')
}

const commandInput = ref('')
const termBody = ref<HTMLElement | null>(null)
onMounted(() => {
  watch(count.value, async () => {
    await nextTick()
    ~(termBody.value as HTMLElement).scrollIntoView(false)
  })
})
</script>
<template>
  <main class="box-body scrollbar">
    <div ref="termBody">
      <TermCommand
        :curDir="curDir"
        v-for="value of count"
        :key="value"
        :value="value"
      />
      <TermCommand
        ref="inputCommandRef"
        :curDir="curDir"
        v-model="commandInput"
        @keydown.enter="increment"
        :isInput="true"
      />
    </div>
  </main>
</template>
