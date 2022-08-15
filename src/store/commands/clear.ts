// clear screen
export const clearShowCommands = () => {
  const { showCommands } = useDirectoryStore()
  showCommands.splice(0, showCommands.length)
}
