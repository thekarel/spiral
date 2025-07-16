import {Args, Command, Flags} from '@oclif/core'
import shell from 'shelljs'

import {getLinearClient} from '../get-linear-client.js'

export default class Hack extends Command {
  static override args = {
    id: Args.string({
      description: 'The ticket ID, e.g. ABC-123',
      required: true,
    }),
  }
  static override description = 'Start working on a ticket'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {
    dry: Flags.boolean({
      default: false,
      description: 'Show the shell command to run but do not execute it. Will still try to read from Linear.',
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Hack)
    const {id} = args

    const linearClient = getLinearClient()

    const ticket = await linearClient.issue(id)

    const branch = `${ticket.identifier.toLocaleLowerCase()}-${ticket.title.replaceAll(/\s+/g, '-').toLowerCase()}`

    const command = `git town hack ${branch}`
    this.log(`The following command ${flags.dry ? 'would' : 'will'} be executed:\n`)
    this.log(command)

    if (flags.dry) {
      this.exit(0)
    }

    const result = shell.exec(command)
    if (result.code !== 0) {
      this.error(result.stderr)
    }
  }
}
