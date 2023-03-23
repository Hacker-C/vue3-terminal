import useDirectoryStore from '../useDirectoryStore'

// TODO: fix the reactive state
export const tree = (commandStr: string) => {
  const { setHistoryPath, addShowCommand } = useDirectoryStore()
  setHistoryPath()
  addShowCommand({
    commandStr,
    type: 'info'
  })
}
