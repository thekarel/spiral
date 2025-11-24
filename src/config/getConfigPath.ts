import fs from 'node:fs'
import path from 'node:path'

const configFilenames = ['spiral.yaml', '.spiral.yaml']

export const getConfigPath = (cwd: string): string | undefined => {
  // Check for environment variable override
  if (process.env.SPIRAL_CONFIG_FILE && fs.existsSync(process.env.SPIRAL_CONFIG_FILE)) {
    return process.env.SPIRAL_CONFIG_FILE
  }

  // Check for config files in current working directory
  for (const filename of configFilenames) {
    const filePath = path.join(cwd, filename)
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
}
