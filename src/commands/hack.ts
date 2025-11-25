/* eslint-disable perfectionist/sort-imports */
import {Args, Command, Flags} from '@oclif/core'
import shell from 'shelljs'

import {createBranchName} from '../branch/createBranchName.js'
import {getLinearClient} from '../get-linear-client.js'

import {loadConfig} from '../config/loadConfig.js'
import {Issue} from '@linear/sdk'

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
    let {id} = args
    const config = loadConfig()

    // Apply prefix from config if it exists and ID doesn't already have it
    if (config.prefix && !id.startsWith(config.prefix)) {
      id = `${config.prefix}${id}`
    }

    const linearClient = getLinearClient(config.linearApiKey)

    let ticket: Issue
    try {
      ticket = await linearClient.issue(id)
    } catch (error) {
      this.error(`Failed to fetch ticket with ID ${id}: ${error}`)
    }

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

    if (config.hack?.status) {
      const statusName = config.hack.status
      this.log(`Updating ticket status to ${config.hack.status}`)
      try {
        // Get the team and its workflow states
        const team = await ticket.team
        const states = await team?.states()

        // Find the state by name (case-insensitive)
        const targetState = states?.nodes.find((state) => state.name.toLowerCase() === statusName.toLowerCase())

        if (!targetState) {
          this.error(`State "${config.hack.status}" not found in team "${team?.name}"`)
        }

        await linearClient.updateIssue(ticket.id, {stateId: targetState.id})
        this.log(`✓ Updated status to "${targetState.name}"`)
      } catch (error) {
        this.error(`Failed to update ticket status: ${error}`)
      }
    }
  }
}
