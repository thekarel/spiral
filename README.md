# Spiral

> A tiny helper for Linear & Git Town workflow

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@thekarel/spiral.svg)](https://npmjs.org/package/@thekarel/spiral)
[![Downloads/week](https://img.shields.io/npm/dw/@thekarel/spiral.svg)](https://npmjs.org/package/@thekarel/spiral)

<!-- toc -->
* [Spiral](#spiral)
* [Installation](#installation)
* [Hack](#hack)
* [Ship](#ship)
* [API Key](#api-key)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Installation

```
npm install -g @thekarel/spiral
```

## What is this?

This tool slightly simplifies a very specific and repetitive workflow:

1. Creating a new, clean branch from a Linear ticket using Git Town
2. Work...
3. Fill the commit message with the ticket information from Linear
4. Publish the changes in a sane way using Git Town

If you've been doing `git hack` and `git town` often you know what I mean.

The CLI has two commands:

1. `spiral hack abc-123`: Create a new branch from a Linear ticket using `git town hack`
2. `spiral ship`: Pre-fill the commit message with the ticket information and run `git town ship`

The format of the branch name and the commit message structure are hard coded, and so are the commands this CLI runs.
This might change in the future.

Context:

- Linear: https://linear.app/
- Git Town: https://git-town.com/

# Hack

The `hack` command creates a new branch from a Linear ticket, using Git Town.
The format of the branch name is `ticket-number-title-of-your-ticket`, for example `abc-123-exciting-the-new-feature`.

Keystrokes saved: several!

# Ship

The `ship` command pre-fills the commit message with the ticket information,
allows you to edit the message and then runs `git town ship`.

The goal is to avoid copy-pasting all the bits and manually formatting the commit message into the expected format.

Productivity increase: not insignificant!

# API Key

Export your API key as `LINEAR_API_KEY`.

You can create one in your Linear account settings under Security & access.
Only add READ permissions.

# Usage

<!-- usage -->
```sh-session
$ npm install -g @thekarel/spiral
$ spiral COMMAND
running command...
$ spiral (--version)
@thekarel/spiral/0.0.3 linux-x64 node-v20.19.3
$ spiral --help [COMMAND]
USAGE
  $ spiral COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`spiral help [COMMAND]`](#spiral-help-command)

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
<!-- commandsstop -->
