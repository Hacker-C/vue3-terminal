import { onMounted, onUnmounted } from 'vue'

export default function useAddEventListener(
  target: EventTarget,
  event: keyof DocumentEventMap,
  callback: EventListener
) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
