import shell from 'shelljs'

let _env: null | {linearApiKey: string} = null

export const env = () => {
  if (_env) return _env

  if (!process.env.LINEAR_API_KEY) {
    throw new Error('LINEAR_API_KEY environment variable is not set')
  }

  if (!shell.which('git')) {
    shell.echo(`This tool requires git but it doesn't seem to be installed`)
    shell.exit(1)
  }

  _env = {
    linearApiKey: process.env.LINEAR_API_KEY,
  }

  return _env
}
