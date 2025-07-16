# Spiral

> A tiny helper for Linear git workflow

Offers no less than one feature:

- Running `git town hack <branch-name>` where the branch is the ID + title from Linear

Example:

```sh
$ spiral hack ABC-123
```

This will run

```sh
git town hack abc-123-the-title-of-your-ticket
```

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@thekarel/spiral.svg)](https://npmjs.org/package/@thekarel/spiral)
[![Downloads/week](https://img.shields.io/npm/dw/@thekarel/spiral.svg)](https://npmjs.org/package/@thekarel/spiral)

<!-- toc -->
* [Spiral](#spiral)
* [this will run](#this-will-run)
* [API Key](#api-key)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# API Key

Export your API key as `LINEAR_API_KEY`.

You can create an API key in your Linear account settings under Security & access.
Make sure you only add READ permissions.

# Usage

<!-- usage -->
```sh-session
$ npm install -g @thekarel/spiral
$ spiral COMMAND
running command...
$ spiral (--version)
@thekarel/spiral/0.0.0 linux-x64 node-v20.19.3
$ spiral --help [COMMAND]
USAGE
  $ spiral COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`spiral help [COMMAND]`](#spiral-help-command)
* [`spiral plugins`](#spiral-plugins)
* [`spiral plugins add PLUGIN`](#spiral-plugins-add-plugin)
* [`spiral plugins:inspect PLUGIN...`](#spiral-pluginsinspect-plugin)
* [`spiral plugins install PLUGIN`](#spiral-plugins-install-plugin)
* [`spiral plugins link PATH`](#spiral-plugins-link-path)
* [`spiral plugins remove [PLUGIN]`](#spiral-plugins-remove-plugin)
* [`spiral plugins reset`](#spiral-plugins-reset)
* [`spiral plugins uninstall [PLUGIN]`](#spiral-plugins-uninstall-plugin)
* [`spiral plugins unlink [PLUGIN]`](#spiral-plugins-unlink-plugin)
* [`spiral plugins update`](#spiral-plugins-update)

## `spiral help [COMMAND]`

Display help for spiral.

```
USAGE
  $ spiral help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for spiral.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.31/src/commands/help.ts)_

## `spiral plugins`

List installed plugins.

```
USAGE
  $ spiral plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ spiral plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.45/src/commands/plugins/index.ts)_

## `spiral plugins add PLUGIN`

Installs a plugin into spiral.

```
USAGE
  $ spiral plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into spiral.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SPIRAL_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SPIRAL_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ spiral plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ spiral plugins add myplugin

  Install a plugin from a github url.

    $ spiral plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ spiral plugins add someuser/someplugin
```

## `spiral plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ spiral plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ spiral plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.45/src/commands/plugins/inspect.ts)_

## `spiral plugins install PLUGIN`

Installs a plugin into spiral.

```
USAGE
  $ spiral plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into spiral.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SPIRAL_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SPIRAL_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ spiral plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ spiral plugins install myplugin

  Install a plugin from a github url.

    $ spiral plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ spiral plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.45/src/commands/plugins/install.ts)_

## `spiral plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ spiral plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ spiral plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.45/src/commands/plugins/link.ts)_

## `spiral plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ spiral plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ spiral plugins unlink
  $ spiral plugins remove

EXAMPLES
  $ spiral plugins remove myplugin
```

## `spiral plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ spiral plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.45/src/commands/plugins/reset.ts)_

## `spiral plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ spiral plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ spiral plugins unlink
  $ spiral plugins remove

EXAMPLES
  $ spiral plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.45/src/commands/plugins/uninstall.ts)_

## `spiral plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ spiral plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ spiral plugins unlink
  $ spiral plugins remove

EXAMPLES
  $ spiral plugins unlink myplugin
```

## `spiral plugins update`

Update installed plugins.

```
USAGE
  $ spiral plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.45/src/commands/plugins/update.ts)_
<!-- commandsstop -->

```

```
