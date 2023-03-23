import type { Ref } from 'vue'
import useAddEventListener from './useAddEventListener'

export default function (el: Ref<HTMLElement | null>) {
  useAddEventListener(document, 'keydown', () => {
    if (el.value) {
      el.value.focus()
    }
  })
}
