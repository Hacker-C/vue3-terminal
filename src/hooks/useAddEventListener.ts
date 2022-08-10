export default function useEventListener(
  target: EventTarget,
  event: keyof DocumentEventMap,
  callback: EventListener
) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
