import uds from '../useDirectoryStore'

// 模拟 help
export const help = (commandStr: string) => {
  uds().setHistoryPath()
  uds().addShowCommand({
    commandStr,
    type: 'info',
    description: 'valid commands:'
  })
}
