# git-diff-script-exclusions

Never run your CI unnecessarily again.

> **Git-diff-script-exclusions** is a CLI tool which allows to compare two git commits and see if modified files are strictly limited to excluded path that you have configured.

_Can be used to determine if a complex operation like launching tests in a CI context is required regarding modified files._

## How to use

This tool has to be used in a git repo.

### Dependencies

- Node (tested on v14 and v16)

### Configure

Exceptions are stored in the file `git-diff-script-exclusions.conf.json`.
It follow the format below 👇

```json
    {
    "exceptions": [
            "docs/*",
            "git-diff-script-exclusions.conf.json"
            "src/ressource/application.yml"
        ]
    }
```

Paths can be folders or files.

### Install and use

Install globally 👇

```bash
$: npm install -g git-diff-script-exclusions
$: npm exec git-diff-script-exclusions --source source_commit_sha --target targe_commit_sha
```

Or use via Npx 👇

```bash
$: npx git-diff-script-exclusions --source source_commit_sha --target targe_commit_sha
```

Use `--help` if needed.

_You can use commit SHA or branch name_

The CLI will return 👇

```bash
|============================================================|
| $: npx git-diff-script-exclusions -- -s my_feature -t main |
|============================================================|

INFO : Comparing : my_feature to : main

Exceptions configured :
 [ [ 'docs', '*' ], [ 'git-diff-script-exclusions.conf.json' ] ]

{
  modifiedFilesInNewestCommit: [
    [ 'git-diff-script-exclusions.conf.json' ],
    [ 'docs/my_doc.md' ]
  ],
  onlyExceptions: true
}
```

The tool print configured exceptions and modified files between source and target commmit. If modified files are strictly contained in the configuration, return will be `onlyExceptions: true` otherwise it will be `onlyExceptions: false`.

_You can use `grep` to pipe `git-diff-script-exclusions` with other CLI tools._

### Use in CI

#### Gitlab

```yaml
stages:
  - test

test:
  stage: test
  image:
    name: node:lts
  script:
    - npm install -g git-diff-script-exclusions
    - echo 'Checking if tests need to be executed...'
    - GIT_DIFF_SCRIPT_EXCLUSIONS=$(npx git-diff-script-exclusions --source $CI_COMMIT_SHA)
    - echo $GIT_DIFF_SCRIPT_EXCLUSIONS
    - >
      if grep -q "onlyExceptions: true" <<< "$GIT_DIFF_SCRIPT_EXCLUSIONS"; then
        echo 'Tests are not required';
      else
        echo 'Launching tests...';
        npm ci
        npm test
      fi;
```

#### Github

```yaml
name: Run Test

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v3
      with:
        node-version: 16
    - name: Install dependencies
      run: npm install -g git-diff-script-exclusions
    - name: Launch tests if needed
      run: |
        echo "Checking if tests need to be executed..."
        GIT_DIFF_SCRIPT_EXCLUSIONS=$(npx git-diff-script-exclusions --source $GITHUB_REF)
        echo $GIT_DIFF_SCRIPT_EXCLUSIONS
        if grep -q "onlyExceptions: true" <<< "$GIT_DIFF_SCRIPT_EXCLUSIONS"; then
          echo "Tests are not required"
        else
          echo "Launching tests..."
          npm ci
          npm test
        fi
```

## Contribute

We welcome contributions to this project! If you have an idea for a new feature or a bug fix, please open an issue on our GitHub page before submitting a pull request. Thank you for your contribution!

To launch the project in development use this command 👇

```bash
$: npm run dev
```

## License

[git-diff-script-exclusions](/LICENSE) is available under the MIT license.
