// ls
export const filesAndDirectories = () => {
  const { dir } = useDirectoryStore()
  const files = dir.files.join('\n')
  const directories = dir.directories.map((curDir) => curDir.name).join('\n')
  return [files + '\n', directories]
}
export const ls = (commandStr: string) => {
  const { setHistoryPath, addShowCommand } = useDirectoryStore()
  setHistoryPath()
  addShowCommand({
    commandStr,
    type: 'info'
  })
}
