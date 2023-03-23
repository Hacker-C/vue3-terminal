import useDirectoryStore from '../useDirectoryStore'

// help
export const help = (commandStr: string) => {
  const { setHistoryPath, addShowCommand } = useDirectoryStore()
  setHistoryPath()
  addShowCommand({
    commandStr,
    type: 'info',
    description: 'valid commands:'
  })
}
