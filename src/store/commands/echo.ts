import { toRefs } from 'vue'
import type { File } from '../useDirectoryStore'
import useDirectoryStore from '../useDirectoryStore'

export const echo = (commandStr: string) => {
  const { setHistoryPath, addShowCommand, splitCommand } = useDirectoryStore()
  setHistoryPath()
  // echo hello world
  // echo hello world > file.txt
  const countOf = (chr: string) => commandStr.split(chr).length - 1
  if (countOf('>') > 2) {
    // illegal arguments, such as `echo > >> file`
    addShowCommand({
      commandStr,
      type: 'error',
      description: 'echo: illegal arguments'
    })
    return
  }
  const re = /[^>^\s]{1,}\s{0,}(>>|>)\s{0,}[^>^\s]{1,}/
  let params = splitCommand(commandStr)[1]
  if (!params.includes('>')) {
    // normal echo output
    addShowCommand({
      commandStr,
      type: 'info',
      description: params
    })
    return
  }
  if (
    !(params.lastIndexOf('>') - params.indexOf('>') <= 1 && re.test(params))
  ) {
    // illegal arguments, such as `echo > 111 > 222`
    addShowCommand({
      commandStr,
      type: 'error',
      description: 'echo: illegal arguments'
    })
    return
  }
  /*
   * echo text > file.txt: write text to file.txt
   * echo text >> file.txt: append text to file.txt
   */
  // hello world > file.txt
  const { dir } = toRefs(useDirectoryStore())
  params = params.trim()
  const [text, targetFile] = params.split(/>>|>/)
  // check if the file exists
  let file = dir.value.files.find(f => f.name === targetFile.trim())
  if (!file) {
    // if the file does not exist, mkdir it
    const newFile = {
      name: targetFile.trim(),
      type: 'file',
      value: text.trim()
    }
    dir.value.files.push(newFile)
  }
  !file && (file = dir.value.files.find(f => f.name === targetFile.trim()))
  if (params.includes('>>')) {
    // `echo text >> file`: append text to file
    (<File>file).value += text.trim()
  } else {
    // `echo text > file`: write text to file
    (<File>file).value = text.trim()
  }
  addShowCommand({
    commandStr,
    type: 'success'
  })
}
