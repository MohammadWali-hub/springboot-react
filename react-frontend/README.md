# React Spring Fullstack Demo
----
This is the part of the frontend project which is built with React.

## build for production
```bash
yarn install --frozen-lockfile
yarn build
```

## development and start
```bash

yarn install --frozen-lockfile // Install modules from the lock file, ensuring package versions are locked.

yarn start
```

## Contribution Guide
### Precondition
vscode must be installed eslint plugin and prettier plugin.

```bash
npm install -g eslint
npm install -g prettier
```
### commit code
```bash
npm run lint
```
Before committing the code, locally run `npm run lint` to check the code formatting, and automatically correct and format the code style.

Upon npm commit, trigger pre-commit to validate and correct the code, as well as to validate the commit message format.

The commit message should follow the format supporting: 'build', 'chore', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test',参考：
https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/index.js

## Dockerize the project
package to docker image use the `Dockerfile` and push to  your docker hub.

## teck stack
- react 18
- react-router-dom 6
- antd 5
- webpack 5
