# Spiral

[![Attestations](https://img.shields.io/badge/Attestations-00aa00)](https://github.com/thekarel/spiral/attestations)

> A tiny helper for Linear & Git Town workflow

# Installation

```
npm install -g @thekarel/spiral
```

This will give you a CLI command named `spiral`.

You can also try using

```
npx @thekarel/spiral
```

## Linear API Key

Export your API key as `LINEAR_API_KEY`.

You can create one in your Linear account settings under Security & access.
Only add READ permissions.

## Git Town

Git Town needs to be installed.

## Package Verification

This package is built with GitHub Actions and signed with artifact attestations for supply chain security.

See https://github.com/thekarel/spiral/attestations

# What is this?

This tool slightly simplifies a very specific and repetitive workflow:

1. Creating a new, clean branch from a Linear ticket using Git Town
2. Work...
3. Fill the commit message with the ticket information from Linear
4. Publish the changes in a sane way using Git Town

If you've been doing `git town hack` and `git town ship` often you know what I mean.

The CLI has two commands:

1. `spiral hack abc-123`: Create a new branch like `abc-123-title-of-ticket` from a Linear ticket number
2. `spiral ship`: Pre-fill the commit message with the ticket information and run `git town ship`

# Commands

## hack

The `hack` command creates a new branch by reading the ticket title from the provided ticket number/id.

The format of the branch name is `ticket-number-title-of-your-ticket`, for example `abc-123-exciting-the-new-feature`.

Benefit: no need to hunt for the branch name in Linear or type it in manually.
It's enough to remember the ticket number, the prefix is usually well known already.

Example:

```sh
# spiral hack --help
spiral hack abc-123
```

## ship

The `ship` command pre-fills the commit message with the ticket information,
allows you to edit the message and then runs `git town ship`.

By default the commit message looks like this:

```
fix: Title of your ticket (abc-123)

Fixes abc-123

https://link-to-your-ticket
```

Benefit: avoid copy-pasting all the bits and manually formatting the commit message into the expected format.

Example:

```sh
# spiral ship --help
spiral ship
```

# Context:

- Linear: https://linear.app/
- Git Town: https://git-town.com/
