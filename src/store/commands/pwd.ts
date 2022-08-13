import uds from '../useDirectoryStore'

// 模拟 pwd
export const pwd = (commandStr: string) => {
  uds().setHistoryPath()
  uds().addShowCommand({
    commandStr,
    type: 'success',
    description: uds().currentFullPath
  })
}
