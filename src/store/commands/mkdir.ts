import { storeToRefs } from 'pinia'
import useDirectoryStore from '../useDirectoryStore'

// mkdir dirName
export const mkdir = (commandStr: string) => {
  const { setHistoryPath, addShowCommand } = useDirectoryStore()
  const { dir } = storeToRefs(useDirectoryStore())
  setHistoryPath()
  // only get the first file directory parameter
  const dirName = commandStr.split(' ')[1]
  const targetDirIndex = dir.value.directories.findIndex(
    curDir => curDir.name === dirName
  )
  if (targetDirIndex !== -1) {
    // if the directory already exists, operation failed
    addShowCommand({
      commandStr,
      type: 'warning',
      description: `dir ${dirName} exists!`
    })
    return
  }
  // success
  dir.value.directories.push({
    id: dir.value.directories.length,
    name: dirName,
    files: [],
    previous: dir.value,
    directories: []
  })
  addShowCommand({
    commandStr,
    type: 'success'
  })
}
