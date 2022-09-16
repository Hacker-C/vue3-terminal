import type { Directory } from '../useDirectoryStore'

// cd dir
export const cd = (commandStr: string) => {
  const { setHistoryPath, addShowCommand, splitCommand } = useDirectoryStore()
  const { dir } = toRefs(useDirectoryStore())
  setHistoryPath()
  const dirname = splitCommand(commandStr)[1]
  if (dirname === '..') {
    // cd ..
    cdBack()
    return void addShowCommand({
      commandStr,
      type: 'success'
    })
  }
  const targetDirIndex = dir.value.directories.findIndex(
    (curDir) => curDir.name === dirname
  )
  if (targetDirIndex === -1) {
    // fail
    return void addShowCommand({
      commandStr,
      type: 'warning',
      description: 'directory not found'
    })
  }
  // success
  dir.value = dir.value.directories[targetDirIndex]
  addShowCommand({
    commandStr,
    type: 'success'
  })
}

// cd ..
export const cdBack = () => {
  const { dir } = toRefs(useDirectoryStore())
  if (dir.value.previous) {
    dir.value = dir.value.previous as Directory
  }
}
