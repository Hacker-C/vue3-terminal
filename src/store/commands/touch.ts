import uds from '../useDirectoryStore'

// 模拟 touch fileName
export const touch = (commandStr: string) => {
  uds().setHistoryPath()
  // 暂时只取第一个文件名参数
  const fileName = commandStr.split(' ')[1]
  const targetFileIndex = uds().dir.files.findIndex((file) => file === fileName)
  if (targetFileIndex !== -1) {
    // 存在同名文件，操作失败
    uds().addShowCommand({
      commandStr,
      type: 'warning',
      description: `file ${fileName} exists!`
    })
    return
  }
  // 操作成功
  uds().dir.files.push(fileName)
  uds().addShowCommand({
    commandStr,
    type: 'success'
  })
}
