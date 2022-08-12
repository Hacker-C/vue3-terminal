import uds from '../useDirectoryStore'

// 模拟 welcome
export const welcome = (commandStr: string) => {
  uds().setHistoryPath()
  uds().addShowCommand({
    commandStr,
    type: 'info'
  })
}
