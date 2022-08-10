import useAddEventListener from './useAddEventListener'
import type { Ref } from 'vue'

export default function (el: Ref<HTMLElement | null>) {
  useAddEventListener(document, 'keydown', () => {
    if (el.value) {
      el.value.focus()
    }
  })
}
