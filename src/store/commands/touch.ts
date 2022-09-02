// touch fileName
export const touch = (commandStr: string) => {
  const { setHistoryPath, addShowCommand } = useDirectoryStore()
  const { dir } = storeToRefs(useDirectoryStore())
  setHistoryPath()
  // only get the first file name
  const fileName = commandStr.split(' ')[1]
  const targetFileIndex = dir.value.files.findIndex(
    (file) => file.name === fileName
  )
  if (targetFileIndex !== -1) {
    // if the file already exists, operation failed
    addShowCommand({
      commandStr,
      type: 'warning',
      description: `file ${fileName} exists!`
    })
    return
  }
  // success
  dir.value.files.push({ name: fileName, value: '' })
  addShowCommand({
    commandStr,
    type: 'success'
  })
}
