import slugify from '@sindresorhus/slugify'

/**
 * Creates a branch name from a ticket identifier and title
 */
export function createBranchName(ticketIdentifier: string, ticketTitle: string): string {
  return slugify(`${ticketIdentifier.toLocaleLowerCase()}-${ticketTitle.replaceAll(/\s+/g, '-').toLowerCase()}`)
}
