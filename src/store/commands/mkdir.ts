import uds from '../useDirectoryStore'

// 模拟 mkdir dirName
export const mkdir = (commandStr: string) => {
  uds().setHistoryPath()
  // 暂时只取第一个文件目录参数
  const dirName = commandStr.split(' ')[1]
  const targetDirIndex = uds().dir.directories.findIndex(
    (curDir) => curDir.name === dirName
  )
  if (targetDirIndex !== -1) {
    // 存在同名文件夹，操作失败
    uds().addShowCommand({
      commandStr,
      type: 'warning',
      description: `dir ${dirName} exists!`
    })
    return
  }
  // 操作成功
  uds().dir.directories.push({
    id: uds().dir.directories.length,
    name: dirName,
    files: [],
    previous: uds().dir,
    directories: []
  })
  uds().addShowCommand({
    commandStr,
    type: 'success'
  })
}
