export const tree = (commandStr: string) => {
  const { setHistoryPath, addShowCommand } = useDirectoryStore()
  setHistoryPath()
  addShowCommand({
    commandStr,
    type: 'info'
  })
}
