import {Command, Flags} from '@oclif/core'
import fs from 'node:fs'
import openEditor from 'open-editor'
import shell from 'shelljs'
import colors from 'yoctocolors'

import {getLinearClient} from '../get-linear-client.js'

export default class Ship extends Command {
  static override args = {}
  static override description = 'Ship your work to the remote repo (git ship)'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {
    dry: Flags.boolean({
      default: false,
      description: 'Show the shell command to run but do not execute it. Will still try to read from Linear.',
    }),
    edit: Flags.boolean({
      allowNo: true,
      default: true,
      description: 'Edit the commit message before committing.',
    }),
    scope: Flags.string({
      default: 'fix',
      description: 'Scope of the commit, e.g. "feature" or "fix(Admin)", will be used as the commit message prefix.',
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Ship)

    const linearClient = getLinearClient()

    // Get current git branch name
    const branchResult = shell.exec('git branch --show-current', {silent: true})
    if (branchResult.code !== 0) {
      this.error('Failed to get current git branch')
    }

    const branchName = branchResult.stdout.trim()
    const ticketIdMatch = branchName.match(/^([a-zA-Z]+-\d+)-/)
    if (!ticketIdMatch) {
      this.error(`Cannot find ticket ID in branch name: ${branchName}`)
    }

    const id = ticketIdMatch[1]
    const ticket = await linearClient.issue(id)

    let message = `${flags.scope}: ${ticket.title} (${ticket.identifier})

Fixes ${ticket.identifier}

${ticket.url}
`

    this.log(`The following message was prepared:`)
    this.log(colors.blue(message))

    if (flags.edit) {
      // Put the commit message in a convenient location
      // but check it first...
      if (fs.existsSync('./COMMIT_MESSAGE')) {
        this.error('The COMMIT_MESSAGE file already exists! This is probably an error, remove it to continue.')
      }

      fs.writeFileSync('./COMMIT_MESSAGE', message)

      await openEditor([{file: './COMMIT_MESSAGE'}], {wait: true})

      message = fs.readFileSync('./COMMIT_MESSAGE', 'utf8')
    }

    fs.rmSync('./COMMIT_MESSAGE', {force: true})

    const messageFlags = message
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((l) => `-m '${l}'`)
      .join(' ')
    const command = `git town ship ${messageFlags}`

    this.log(`The following command ${flags.dry ? 'would' : 'will'} be executed:`)
    this.log(colors.blue(`$ ${command}`))

    if (flags.dry) {
      this.end()
    }

    const result = shell.exec(command)
    if (result.code !== 0) {
      this.error(result.stderr)
    }

    this.end()
  }

  private end() {
    fs.rmSync('./COMMIT_MESSAGE', {force: true})
    this.exit(0)
  }
}
