interface Directory {
  id: number
  name: string
  files: string[]
  directories: Directory[]
  previous: Directory | null
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

export const useDirectoryStore = defineStore('directory', () => {
  // 文件总目录
  const dir = ref<Directory>(initDir())
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

  // NOTE 合法指令（已经完成的指令）
  const ValidCommands = ['cd', 'ls', 'pwd', 'clear', 'mkdir', 'touch']

  // 是否合法的命令
  const isValidCommand = (command: string) => {
    return ValidCommands.includes(command)
  }

  // 显示在屏幕上的历史命令
  const showCommands = ref<string[]>([])
  // 清空屏幕
  const clearShowCommands = () => {
    showCommands.value.splice(0, showCommands.value.length)
  }
  // 添加历史命令
  const addShowCommand = (command: string) => {
    showCommands.value.push(command)
  }

  // 维护一个固定的上一次历史命令
  const historyPath = ref('/')
  const setHistoryPath = (path: string) => {
    historyPath.value = path
  }

  // 模拟 cd dir
  const cd = (targetDirName: string): number => {
    setHistoryPath(currentFullPath.value)
    const targetDirIndex = dir.value.directories.findIndex(
      (dir) => dir.name === targetDirName
    )
    if (targetDirIndex === -1) {
      return 1 // 操作失败
    }
    dir.value = dir.value.directories[targetDirIndex]
    return 0 // 操作成功
  }

  // 模拟 cd ..
  const cdBack = () => {
    setHistoryPath(currentFullPath.value)
    if (dir.value.previous) {
      dir.value = dir.value.previous
    }
  }

  // 模拟 pwd
  const pwd = () => {
    setHistoryPath(currentFullPath.value)
    addShowCommand('pwd')
  }

  // 模拟 mkdir dirName
  const mkdir = (dirName: string) => {
    setHistoryPath(currentFullPath.value)
    const targetDirIndex = dir.value.directories.findIndex(
      (dir) => dir.name === dirName
    )
    if (targetDirIndex !== -1) {
      addShowCommand('mkdir')
      return 1 // 存在同名文件夹，操作失败
    }
    dir.value.directories.push({
      id: dir.value.directories.length,
      name: dirName,
      files: [],
      previous: dir.value,
      directories: []
    })
    addShowCommand('mkdir ' + dirName)
    return 0 // 操作成功
  }

  // 模拟 touch fileName
  const touch = (fileName: string) => {
    setHistoryPath(currentFullPath.value)
    const targetFileIndex = dir.value.files.findIndex(
      (file) => file === fileName
    )
    if (targetFileIndex !== -1) {
      addShowCommand('touch')
      return 1 // 存在同名文件，操作失败
    }
    dir.value.files.push(fileName)
    addShowCommand('touch ' + fileName)
    return 0 // 操作成功
  }

  // 模拟 ls
  const filesAndDirectories = computed(() => {
    const files = dir.value.files.join('\n')
    const directories = dir.value.directories.map((dir) => dir.name).join('\n')
    return [files + '\n', directories]
  })
  const ls = () => {
    setHistoryPath(currentFullPath.value)
    addShowCommand('ls')
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
    touch
  }
})
