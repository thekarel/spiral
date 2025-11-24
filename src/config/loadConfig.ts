import fs from 'node:fs'
import process from 'node:process'
import {parse} from 'yaml'

import type {AppConfig} from './AppConfig.js'

import {getConfigPath} from './getConfigPath.js'
import {getEnv} from './getEnv.js'

/**
 * Loads configuration from a YAML file
 * Checks for config files in order: .spiral.yaml, spiral.yaml, or SPIRAL_CONFIG_FILE env var
 * Returns empty config if no file exists
 */
export function loadConfig(): AppConfig {
  const _env = getEnv()
  const config = {..._env}

  const configPath = getConfigPath(process.cwd())

  // Return empty config if no file found
  if (!configPath) {
    return config
  }

  try {
    const fileContents = fs.readFileSync(configPath, 'utf8')
    const userConfig = parse(fileContents) as AppConfig
    return {
      ...config,
      ...userConfig,
    }
  } catch (error) {
    // If there's an error reading or parsing the file, return empty config
    console.warn(`Warning: Failed to load config from ${configPath}:`, error)
    return config
  }
}
