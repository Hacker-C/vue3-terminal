export const echo = (commandStr: string) => {
  const { setHistoryPath, addShowCommand, splitCommand } = useDirectoryStore()
  setHistoryPath()
  addShowCommand({
    commandStr,
    type: 'info',
    description: splitCommand(commandStr)[1]
  })
}
