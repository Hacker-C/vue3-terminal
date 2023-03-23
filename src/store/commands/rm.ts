import { storeToRefs } from 'pinia'
import useDirectoryStore from '../useDirectoryStore'

export const rm = (commandStr: string) => {
  const { setHistoryPath, addShowCommand } = useDirectoryStore()
  const { dir } = storeToRefs(useDirectoryStore())
  setHistoryPath()
  const fileName = commandStr.split(' ')[1]
  const targetFileIndex = dir.value.files.findIndex(
    curFile => curFile.name === fileName
  )
  if (targetFileIndex === -1) {
    return addShowCommand({
      commandStr,
      isValid: true,
      type: 'error',
      description: `no such file: '${fileName}'`
    })
  }
  dir.value.files.splice(targetFileIndex, 1)
  addShowCommand({
    commandStr,
    isValid: true,
    type: 'success',
    description: `remove '${fileName}' successfully`
  })
}
