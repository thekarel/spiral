import {confirm} from '@inquirer/prompts'
import {Command, Flags} from '@oclif/core'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import openEditor from 'open-editor'
import shell from 'shelljs'
import colors from 'yoctocolors'

import {extractTicketIdFromBranch} from '../branch/extractTicketIdFromBranch.js'
import {getCurrentBranchName} from '../branch/getCurrentBranchName.js'
import {getLinearClient} from '../get-linear-client.js'

export default class Ship extends Command {
  static override args = {}
  static override description = 'Ship your work to the remote repo (git ship)'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {
    confirm: Flags.boolean({
      default: false,
      description: 'Ask for confirmation before executing the command (default: false)',
    }),
    edit: Flags.boolean({
      allowNo: true,
      default: true,
      description: `Edit the commit message before committing. Otherwise it's auto generated (default: true)`,
    }),
    scope: Flags.string({
      default: 'fix',
      description:
        'Scope of the commit, e.g. "feature" or "fix(Admin)", will be used as the commit message prefix (default: "fix")',
    }),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Ship)

    const linearClient = getLinearClient()

    const id = extractTicketIdFromBranch(getCurrentBranchName())
    if (!id) {
      this.error(`Cannot find ticket ID in branch name`)
    }

    const ticket = await linearClient.issue(id)
    if (!ticket?.title) {
      this.error(`Cannot find ticket ${id}`)
    }

    let message = `${flags.scope}: ${ticket.title} (${ticket.identifier})

Fixes ${ticket.identifier}

${ticket.url}
`

    this.log(`The following message was prepared:`)
    this.log(colors.blue(message))

    const tempDirPath = fs.mkdtempSync(path.join(os.tmpdir(), 'spiral-'))
    this.debug('tempDirPath', tempDirPath)
    const tempFilePath = path.join(tempDirPath, 'COMMIT_MESSAGE')

    try {
      fs.writeFileSync(tempFilePath, message)

      if (flags.edit) {
        await openEditor([{file: tempFilePath}], {wait: true})

        message = fs.readFileSync(tempFilePath, 'utf8')
      }
    } catch (error) {
      this.logToStderr(`Failed to obtain commit message:`)
      this.error(`${error}`)
    } finally {
      fs.rmSync(tempDirPath, {force: true, recursive: true})
    }

    const command = `git town ship -m "${message}"`

    this.log(`The following command will be executed:`)
    this.log(colors.blue(`$ ${command}`))

    if (flags.confirm) {
      const proceed = await confirm({default: true, message: 'Proceed with the commit?'})
      if (!proceed) {
        this.log('Exiting without commit')
        this.exit(0)
      }
    }

    const result = shell.exec(command)
    if (result.code !== 0) {
      this.error(result.stderr)
    }
  }
}
