import uds from '../useDirectoryStore'

// 模拟 ls
export const filesAndDirectories = () => {
  const files = uds().dir.files.join('\n')
  const directories = uds()
    .dir.directories.map((curDir) => curDir.name)
    .join('\n')
  return [files + '\n', directories]
}
export const ls = (commandStr: string) => {
  uds().setHistoryPath()
  uds().addShowCommand({
    commandStr,
    type: 'info'
  })
}
