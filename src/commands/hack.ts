import {Args, Command, Flags} from '@oclif/core'
import shell from 'shelljs'

import {createBranchName} from '../branch/createBranchName.js'
import {getLinearClient} from '../get-linear-client.js'

export default class Hack extends Command {
  static override args = {
    id: Args.string({
      description: 'The ticket ID, e.g. ABC-123',
      required: true,
    }),
  }
  static override description = 'Create a new branch for a ticket (git hack)'
  static override examples = ['<%= config.bin %> <%= command.id %> ABC-123']
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

    const branch = createBranchName(ticket.identifier, ticket.title)

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
