const go = function (commandStr: string, uri: string) {
  const { addShowCommand } = useDirectoryStore()
  addShowCommand({
    commandStr,
    type: 'success'
  })
  setTimeout(() => {
    window.open(/https{0,1}/.test(uri) ? uri : '//' + uri)
  }, 500)
}

export const open = function (commandStr: string) {
  const { setHistoryPath, splitCommand } = useDirectoryStore()
  const uri = splitCommand(commandStr)[1]
  setHistoryPath()
  go(commandStr, uri)
}

export const google = function (commandStr: string) {
  const { setHistoryPath, splitCommand } = useDirectoryStore()
  const keywords = splitCommand(commandStr)[1]
  setHistoryPath()
  go(commandStr, 'www.google.com/search?q=' + keywords)
}

export const baidu = function (commandStr: string) {
  const { setHistoryPath, splitCommand } = useDirectoryStore()
  const keywords = splitCommand(commandStr)[1]
  setHistoryPath()
  go(commandStr, 'www.baidu.com/s?wd=' + keywords)
}

export const github = function () {
  const { setHistoryPath } = useDirectoryStore()
  setHistoryPath()
  go('github', 'https://github.com/Hacker-C/vue3-terminal')
}
