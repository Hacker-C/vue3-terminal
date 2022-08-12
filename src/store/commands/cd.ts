import uds from '../useDirectoryStore'
import type { Directory } from '../useDirectoryStore'

// 模拟 cd dir
export const cd = (commandStr: string) => {
  uds().setHistoryPath()
  const dirname = uds().splitCommand(commandStr)[1]
  if (dirname === '..') {
    cdBack()
    // 成功
    return void uds().addShowCommand({
      commandStr,
      type: 'success'
    })
  }
  const targetDirIndex = uds().dir.directories.findIndex(
    (curDir) => curDir.name === dirname
  )
  if (targetDirIndex === -1) {
    // 操作失败
    console.log(commandStr)
    return void uds().addShowCommand({
      commandStr,
      type: 'warning',
      description: 'directory not found'
    })
  }
  // 操作成功
  uds().dir = uds().dir.directories[targetDirIndex]
  uds().addShowCommand({
    commandStr,
    type: 'success'
  })
}

// 模拟 cd ..
export const cdBack = () => {
  if (uds().dir.previous) {
    uds().dir = uds().dir.previous as Directory
  }
}
