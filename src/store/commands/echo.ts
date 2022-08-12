import uds from '../useDirectoryStore'

export const echo = (commandStr: string) => {
  uds().setHistoryPath()
  uds().addShowCommand({
    commandStr,
    type: 'info',
    description: uds().splitCommand(commandStr)[1]
  })
}
