// pwd
export const pwd = (commandStr: string) => {
  const { setHistoryPath, addShowCommand, currentFullPath } =
    useDirectoryStore()
  setHistoryPath()
  addShowCommand({
    commandStr,
    type: 'success',
    description: currentFullPath
  })
}
