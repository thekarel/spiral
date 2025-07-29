/**
 * Extracts ticket ID from a branch name
 */
export function extractTicketIdFromBranch(branchName: string): string | undefined {
  const ticketIdMatch = branchName.match(/^([a-zA-Z]+-\d+)-/)
  return ticketIdMatch?.[1]
}
