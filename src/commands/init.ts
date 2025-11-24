import {Command} from '@oclif/core'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {fileURLToPath} from 'node:url'
import colors from 'yoctocolors'

import {getConfigPath} from '../config/getConfigPath.js'

export default class Init extends Command {
  static override args = {}
  static override description = 'Initialize a new spiral.yaml config file'
  static override examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const existingConfigPath = getConfigPath(process.cwd())
    if (existingConfigPath) {
      this.error(`A config file already exists at ${existingConfigPath}`)
    }

    const targetPath = path.join(process.cwd(), 'spiral.yaml')

    // Get the path to spiral.yaml.example
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const examplePath = path.join(__dirname, '..', '..', 'spiral.yaml.example')

    // Check if the example file exists
    if (!fs.existsSync(examplePath)) {
      this.error('spiral.yaml.example not found in the project root')
    }

    // Copy the file
    try {
      fs.copyFileSync(examplePath, targetPath)
      this.log(colors.green('✓') + ' Created spiral.yaml')
    } catch (error) {
      this.error(`Failed to create spiral.yaml: ${error}`)
    }
  }
}
