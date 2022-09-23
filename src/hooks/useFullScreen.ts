import type { Ref } from 'vue'

export function fullScreen(obj: Ref<HTMLElement | null>) {
  obj.value && (obj.value.style.position = 'fixed')
  obj.value && (obj.value.style.top = '0')
  obj.value && (obj.value.style.left = '0')
  obj.value && (obj.value.style.width = '100vw')
  obj.value && (obj.value.style.height = '100vh')
}

export function exitFullScreen(obj: Ref<HTMLElement | null>) {
  obj.value && (obj.value.style.position = 'absolute')
  obj.value && (obj.value.style.top = '')
  obj.value && (obj.value.style.left = '')
  obj.value && (obj.value.style.width = '80%')
  obj.value && (obj.value.style.height = '90vh')
}
