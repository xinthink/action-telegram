# action-telegram

[![Check Status][check-badge]][github-runs]
[![MIT][license-badge]][license]

A simple [Action] sending [Telegram] notification for workflow set up with [GitHub Actions]

[check-badge]: https://github.com/xinthink/action-telegram/workflows/Check/badge.svg
[github-runs]: https://github.com/xinthink/action-telegram/actions
[license-badge]: https://img.shields.io/github/license/xinthink/action-telegram
[license]: https://raw.githubusercontent.com/xinthink/action-telegram/master/LICENSE

## Usage

Add a step to your [workflow] in order to receive [Telegram] notifications, for example:

```yml
- name: notification
  if: cancelled() == false
  uses: xinthink/action-telegram@v1
  with:
    botToken: ${{ secrets.BotToken }}
    chatId: ${{ secrets.ChatID }}
    jobStatus: ${{ job.status }}
```

> You can find more details in [action.yml]

The [Telegram] message will look like:
  - BOT name

    🔴 [owner/repo]() Check **Failure**

    `refs/heads/master` `5cabc6f` by **author**

    [View details]()

> Where `Check` will be the name of your workflow

## Development

[Yarn] is preferred for everyday tasks, so there's a `yarn.lock` instead of `package-lock.json` on the *master* branch. We will use [yarn run] ([npm scripts]) for handling the *node_modules* stuff, and also compiling [TypeScript] sources.

- Run command `yarn release` before committing to *release* branches
- Run command `yarn dev` before doing development tasks or committing to the *master* branch


[GitHub Actions]: https://help.github.com/en/articles/about-github-actions
[Action]: https://help.github.com/en/articles/about-actions
[workflow]: https://help.github.com/en/articles/workflow-syntax-for-github-actions
[Telegram]: https://telegram.org
[action.yml]: https://github.com/xinthink/action-telegram/blob/master/action.yml
[yarn]: https://yarnpkg.com/
[yarn run]: https://yarnpkg.com/lang/en/docs/cli/run/
[npm scripts]: https://docs.npmjs.com/misc/scripts
[TypeScript]: https://www.typescriptlang.org
