import shell from 'shelljs'

/**
 * Gets the current git branch name
 */
export function getCurrentBranchName(): string {
  const branchResult = shell.exec('git branch --show-current', {silent: true})
  if (branchResult.code !== 0) {
    throw new Error('Failed to get current git branch')
  }

  return branchResult.stdout.trim()
}
