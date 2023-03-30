<script setup lang="ts">
import { provide, ref } from 'vue'
import { fullScreenKey } from '@/utils/provide-inject_keys'
import { exitFullScreen, fullScreen } from '@/hooks/useFullScreen'
import TermHeader from '@/components/TermHeader.vue'
import TermBody from '@/components/TermBody/TermBody.vue'

const VDownDrag = {
  mounted: (el: HTMLElement) => {
    let [x, y, startX, startY, moveX, moveY] = Array(6).fill(0) as number[]
    el.addEventListener('mousedown', (e: MouseEvent) => {
      // 防止鼠标移动到窗口外丢失 mouseup 事件
      e.stopPropagation()
      e.preventDefault()
      x = e.pageX
      y = e.pageY
      startX = el.offsetLeft
      startY = el.offsetTop
      window.addEventListener('mousemove', fn)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', fn)
      })
      function fn(e: MouseEvent) {
        e.stopImmediatePropagation()
        requestAnimationFrame(() => {
          moveX = e.pageX - x
          moveY = e.pageY - y
          el.style.left = `${startX + moveX}px`
          let resY = 0
          if (startY + moveY <= 0) {
            // 防止过度拖动，超出窗口顶部外
            resY = 0
          } else if (startY + moveY >= window.innerHeight - 40) {
            // 防止过度拖动，超出窗口底部外
            resY = window.innerHeight - 40
          } else {
            resY = startY + moveY
          }
          el.style.top = `${resY}px`
        })
      }
    })
  }
}

const termRef = ref<HTMLElement | null>(null)

const flag = ref(false)
provide(fullScreenKey, () => {
  flag.value = !flag.value
  if (flag.value) fullScreen(termRef)
  else exitFullScreen(termRef)
})
</script>

<template>
  <div ref="termRef" v-down-drag class="box-container">
    <TermHeader />
    <TermBody class="cursor-auto opacity-90" @mousedown.stop />
  </div>
</template>
