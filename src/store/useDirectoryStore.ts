import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { cat } from './commands/cat'
import { cd, cdBack } from './commands/cd'
import { clearShowCommands } from './commands/clear'
import { echo } from './commands/echo'
import { help } from './commands/help'
import { filesAndDirectories, ls } from './commands/ls'
import { mkdir } from './commands/mkdir'
import { baidu, github, google } from './commands/open'
import { pwd } from './commands/pwd'
import { rm } from './commands/rm'
import { touch } from './commands/touch'
import { tree } from './commands/tree'
import { welcome } from './commands/welcome'

// the structure of file
export interface File {
  name: string
  value: string
}

// the directory system data structure
export interface Directory {
  id: number
  name: string
  files: File[]
  directories: Directory[]
  previous: Directory | null
}

// the command data structure
export interface Command {
  commandStr: string
  isValid?: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  description?: string
}

// init the root directory
function initDir(): Directory {
  const dir: Directory = {
    id: 0,
    name: '/',
    files: [
      { name: 'file1.txt', value: 'hello, just some text' },
      { name: 'file2.txt', value: 'hello, just some text' }
    ],
    previous: null,
    directories: []
  }
  let temp = dir
  temp.directories.push({
    id: 1,
    name: 'home',
    files: [],
    previous: temp,
    directories: []
  })
  temp = temp.directories[0]
  temp.directories.push({
    id: 2,
    name: 'murphy',
    files: [],
    previous: temp,
    directories: []
  })
  return dir
}

// resolve the command
function splitCommand(command: string): string[] {
  return [command.split(' ')[0], command.split(' ').slice(1).join(' ')]
}

const useDirectoryStore = defineStore('directory', () => {
  // the current directory pointer
  const dir = ref<Directory>(initDir().directories[0].directories[0])
  // current directory name
  const currentDirName = computed(() => dir.value.name)
  // current full name of the current path
  const currentFullPath = computed(() => {
    let path = dir.value.name
    let temp = dir.value.previous
    while (temp) {
      path = `${temp.name === '/' ? '' : temp.name}/${path}`
      temp = temp.previous
    }
    return path
  })

  // reset the dir
  const reset = () => {
    dir.value = {
      id: 0,
      name: '/',
      files: [],
      previous: null,
      directories: []
    }
  }

  // valid commands(finished commands)
  const ValidCommands = ['cd', 'ls', 'pwd', 'clear', 'mkdir', 'touch', 'welcome', 'help', 'echo', 'cat', 'open', 'google', 'baidu', 'github', 'rm', 'tree']
  const commandDescription = [
    'cd [dirname] - change directory',
    'ls - list files in current directory',
    'pwd - print current directory',
    'clear - clear screen',
    'mkdir [dirname] - create directory',
    'touch [filename] - create file',
    'welcome - welcome message',
    'help - help message',
    'echo [message] / echo [text] > [file] / echo [text] >> [file]',
    'cat [filename] - cat file',
    'open [url] - open url in new tab',
    'google [keywords] - search keywords in google',
    'baidu [keywords] - search keywords in baidu',
    'github - the source code of this project',
    'rm - rm [filename] - remove file',
    'tree - show the directory tree'
  ]

  // help message
  const commandHelp = computed(() => {
    return ValidCommands.map((item, index) => {
      return [item, commandDescription[index]]
    })
  })

  // the command is valid or not
  const isValidCommand = (commandStr: string) => {
    return ValidCommands.includes(commandStr.split(' ')[0])
  }

  // the history command displayed on the screen
  const showCommands = ref<Command[]>([])

  // add a history command
  const addShowCommand = (command: Command) => {
    showCommands.value.push({
      ...command,
      isValid: isValidCommand(command.commandStr)
    })
  }

  // history path
  const historyPath = ref('/')
  // record history path
  const setHistoryPath = () => {
    historyPath.value = currentFullPath.value
  }

  // handle the unfinished commands
  const handleOther = (commandStr: string) => {
    setHistoryPath()
    addShowCommand({
      commandStr,
      type: 'error',
      description: 'command not found!'
    })
  }

  return {
    dir,
    reset,
    cd,
    cdBack,
    currentDirName,
    showCommands,
    clearShowCommands,
    addShowCommand,
    currentFullPath,
    historyPath,
    pwd,
    filesAndDirectories,
    ls,
    isValidCommand,
    mkdir,
    touch,
    setHistoryPath,
    commandHelp,
    welcome,
    help,
    handleOther,
    splitCommand,
    echo,
    cat,
    open,
    google,
    baidu,
    github,
    rm,
    tree
  }
})

export default useDirectoryStore
