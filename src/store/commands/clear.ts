import uds from '../useDirectoryStore'

// 清空屏幕 clear
export const clearShowCommands = () => {
  uds().showCommands.splice(0, uds().showCommands.length)
}
