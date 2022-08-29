# git-diff-script-exclusions

`Git-diff-script-exclusions` is a CLI tool which allows to compare two git commits and see if modified files are strictly limited to excluded path that you have configured.

_Can be used to determine if a complex operation like launching tests in a CI context is required regarding modified files._

## How to use

This tool has to be used in a git repo.

### Dependencies

- Node (tested on v14 and v16)

### Configure :

Exceptions are stored in the file `exceptions.conf.json`. It follow the format below :

```json
    {
    "exceptions": [
            "docs/*",
            "exceptions.conf.json"
            "src/ressource/application.yml"
        ]
    }
```

Paths can be folders or files.

### Install and use

Install globally :

```bash
$: npm install -g git-diff-script-exclusions
$: npm exec git-diff-script-exclusions --source source_commit_sha --target targe_commit_sha
```

Use via Npx :

```bash
$: npx git-diff-script-exclusions --source source_commit_sha --target targe_commit_sha
```

Use `--help` if needed.

_You can use commit SHA or branch name_

The CLI will return :

```
|============================================================|
| $: npx git-diff-script-exclusions -- -s my_feature -t main |
|============================================================|

INFO : Comparing : my_feature to : main

Exceptions configured :
 [ [ 'docs', '*' ], [ 'exceptions.conf.json' ] ]

{
  modifiedFilesInNewestCommit: [
    [ 'exceptions.conf.json' ],
    [ 'docs/my_doc.md' ]
  ],
  onlyExceptions: true
}
```

The tool print configured exceptions and modified files between source and target commmit. If modified files are strictly contained in the configuration, return will be `onlyExceptions: true` otherwise it will be `onlyExceptions: false`.

_You can use `grep` to pipe `git-diff-script-exclusions` with other CLI tools._

### Use in CI

#### Gitlab

TODO

#### Github

TODO

## Contribute

```bash
$: npm run dev
```

## License

git-diff-script-exclusions is available under the MIT license.
