import type { InjectionKey } from 'vue'

// temporarily close the key
export const showKey = Symbol('showKey') as InjectionKey<() => void>

// toggle full screen
export const fullScreenKey = Symbol('fullScreenKey') as InjectionKey<() => void>

// close the terminal
export const closeKey = Symbol('closeKey') as InjectionKey<() => void>
