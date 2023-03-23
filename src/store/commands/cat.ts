import { toRefs } from 'vue'
import useDirectoryStore from '../useDirectoryStore'

export const cat = function (commandStr: string) {
  const { setHistoryPath, addShowCommand, splitCommand } = useDirectoryStore()
  setHistoryPath()
  // cat file.txt
  const { dir } = toRefs(useDirectoryStore())
  const targetFileName = splitCommand(commandStr)[1]
  const file = dir.value.files.find(file => file.name === targetFileName)
  addShowCommand({
    commandStr,
    type: 'info',
    description: file ? file.value : 'file not found'
  })
}
