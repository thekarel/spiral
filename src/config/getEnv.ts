import shell from 'shelljs'

export const getEnv = () => {
  if (!process.env.LINEAR_API_KEY) {
    throw new Error('LINEAR_API_KEY environment variable is not set')
  }

  if (!shell.which('git')) {
    shell.echo(`This tool requires git but it doesn't seem to be installed`)
    shell.exit(1)
  }

  if (!shell.which('git-town')) {
    shell.echo(`This tool requires git town but it doesn't seem to be installed`)
    shell.exit(1)
  }

  return {
    linearApiKey: process.env.LINEAR_API_KEY,
  }
}
