# Hux Contributing Guide

Any contributions are extremely welcome and appreciated. However, before doing so we do ask that you read the following.

- [Code of Conduct](https://github.com/hux-js/hux-dox/blob/develop/CODE_OF_CONDUCT.md)
- [Contributing](#contributing)

## Contributing

- Pushing straight to `main` and `develop` branches is disabled.

- All development should be done in branches that are based off of `develop`.

- Please use concise commit messages.

- When pulling in `develop` changes _after_ PR feedback has been given, please merge commit to avoid changing the timeline of the PR rather than rebasing.

- Make sure tests and linting passes before opening a full pull request. This is not a requirement when opening a draft pull request.

- Open a draft pull request to start the feedback cycle early.

- Ensure new code has decent test coverage.

## Deploying

You'll have to have the correct npm permissions to deploy, but to do so - Switch to the main branch. Ensure the release PR has been merged in, then rebase. Use this command to publish the release: `GIT_USER=your-username CURRENT_BRANCH=main USE_SSH=true npm run publish-gh-pages`
