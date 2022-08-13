<script setup lang="ts">
const VDownDrag = {
  mounted: (el: HTMLElement) => {
    el.style.cursor = 'move'
    let [x, y, startX, startY, moveX, moveY] = Array(6).fill(0) as number[]
    el.addEventListener('mousedown', (e: MouseEvent) => {
      e.stopPropagation()
      x = e.pageX
      y = e.pageY
      startX = el.offsetLeft
      startY = el.offsetTop
      window.addEventListener('mousemove', fn)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', fn)
      })
      function fn(e: MouseEvent) {
        requestAnimationFrame(() => {
          moveX = e.pageX - x
          moveY = e.pageY - y
          el.style.left = `${startX + moveX}px`
          el.style.top = `${startY + moveY}px`
        })
      }
    })
  }
}
</script>

<template>
  <div class="screen">
    <div class="box-container" v-down-drag>
      <TermHeader />
      <TermBody @mousedown.stop class="cursor-auto opacity-90" />
    </div>
  </div>
</template>

<style scoped>
.screen {
  @apply w-screen h-screen fixed
      flex justify-center
      bg-[url('@/assets/images/bg-macos.jpg')] bg-center bg-cover;
}
</style>
