# Contributing to This Project

## Bug reports and feature submissions

To submit an issue or request a feature, please do so on [Github](https://github.com/daun/processwire-dashboard/issues).

If you file a bug report, your issue should contain a title and a clear description of the issue. You should also include as much relevant information as possible and a code sample that demonstrates the issue. The goal of a bug report is to make it easy for yourself - and others - to replicate the bug and develop a fix.

Remember, bug reports are created in the hope that others with the same problem will be able to collaborate with you on solving it. Do not expect that the bug report will automatically see any activity or that others will jump to fix it. Creating a bug report serves to help yourself and others start on the path of fixing the problem.

## Versioning scheme

The project follows [semantic versioning](https://semver.org/). Minor and patch releases should never contain breaking changes. Make sure to check for upgrade instructions and test your code before upgrading major versions which **will** contain breaking changes.

The `VERSION` file at the root of the project needs to be updated and a Git tag created to properly release a new version.

## Pull Requests

All bug fixes and feature submissions should be sent to the `develop` branch. The `master` branch is for tagged releases only.

Please send coherent history: make sure each individual commit in your pull request is meaningful. If you had to make a lot of intermediate commits while developing, please [squash them](http://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages) before submitting.

## Coding style

- PHP: [PSR-2 Coding Standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md).
- Javascript: [Standard](https://standardjs.com/), [Vue ESLint Essentials](https://github.com/vuejs/eslint-plugin-vue).
