import type { InjectionKey } from 'vue'

export const closeKey = Symbol() as InjectionKey<() => void>
