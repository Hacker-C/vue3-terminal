export interface Directory {
  id: number
  name: string
  files: string[]
  directories: Directory[]
  previous: Directory | null
}

export interface Command {
  commandStr: string
  isValid?: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  description?: string
}

// 初始化根目录
function initDir(): Directory {
  const dir: Directory = {
    id: 0,
    name: '/',
    files: ['file1.txt', 'file2.txt'],
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

// 解析命令
function splitCommand(command: string): string[] {
  return [command.split(' ')[0], command.split(' ').slice(1).join(' ')]
}

const useDirectoryStore = defineStore('directory', () => {
  // 文件总目录
  const dir = ref<Directory>(initDir().directories[0].directories[0])
  // 当前目录名
  const currentDirName = computed(() => dir.value.name)
  // 当前目录完整路径
  const currentFullPath = computed(() => {
    let path = dir.value.name
    let temp = dir.value.previous
    while (temp) {
      path = (temp.name === '/' ? '' : temp.name) + '/' + path
      temp = temp.previous
    }
    return path
  })

  // 合法指令（已经完成的指令）
  // prettier-ignore
  const ValidCommands = ['cd', 'ls', 'pwd', 'clear', 'mkdir', 'touch', 'welcome', 'help', 'echo']
  const commandDescription = [
    'cd [dirname] - change directory',
    'ls - list files in current directory',
    'pwd - print current directory',
    'clear - clear screen',
    'mkdir [dirname] - create directory',
    'touch [filename] - create file',
    'welcome - welcome message',
    'help - help message',
    'echo [message] - echo message'
  ]

  // 帮助命令信息 help
  const commandHelp = computed(() => {
    return ValidCommands.map((item, index) => {
      return [item, commandDescription[index]]
    })
  })

  // 是否合法的命令
  const isValidCommand = (commandStr: string) => {
    return ValidCommands.includes(commandStr.split(' ')[0])
  }

  // 显示在屏幕上的历史命令
  const showCommands = ref<Command[]>([])

  // 添加历史命令
  const addShowCommand = (command: Command) => {
    showCommands.value.push({
      ...command,
      isValid: isValidCommand(command.commandStr)
    })
  }

  // 维护一个固定的上一次历史命令
  const historyPath = ref('/')
  // 记录上一次的历史命令
  const setHistoryPath = () => {
    historyPath.value = currentFullPath.value
  }

  // 处理其他
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
    echo
  }
})

export default useDirectoryStore
