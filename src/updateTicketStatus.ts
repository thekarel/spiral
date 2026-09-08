import {Issue, LinearClient} from '@linear/sdk'

/**
 * Moves the ticket into the workflow state with the given name (case-insensitive).
 * Returns the name of the state it was moved to.
 */
export async function updateTicketStatus(
  linearClient: LinearClient,
  ticket: Issue,
  statusName: string,
): Promise<string> {
  const team = await ticket.team
  const states = await team?.states()

  const targetState = states?.nodes.find((state) => state.name.toLowerCase() === statusName.toLowerCase())

  if (!targetState) {
    throw new Error(`State "${statusName}" not found in team "${team?.name}"`)
  }

  await linearClient.updateIssue(ticket.id, {stateId: targetState.id})

  return targetState.name
}
