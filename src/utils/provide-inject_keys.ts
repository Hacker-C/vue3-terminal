import type { InjectionKey } from 'vue'

// temprarily close the key
export const showKey = Symbol() as InjectionKey<() => void>

// toggle full screen
export const fullScreenKey = Symbol() as InjectionKey<() => void>

// close the terminal
export const closeKey = Symbol() as InjectionKey<() => void>
