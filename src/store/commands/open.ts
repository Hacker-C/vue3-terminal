export const open = function (commandStr: string) {
  const { setHistoryPath, addShowCommand, splitCommand } = useDirectoryStore()
  setHistoryPath()
  const uri = splitCommand(commandStr)[1]
  window.open('//' + uri)
  addShowCommand({
    commandStr,
    type: 'success'
  })
}
