#!/usr/bin/env node

import { exec } from "child_process";
import * as fs from "fs";

const [SHA1, SHA2] = process.argv.slice(2, 4);

console.log("new commit: ", SHA1, "compare to: ", SHA2);

const getExceptionsConf = (): { exceptions: Array<string> } =>
  JSON.parse(fs.readFileSync("./exceptions.conf.json").toString());

exec(
  `git diff --name-only ${SHA1 ?? ""} ${SHA2 ?? ""}`,
  (error, stdout, stderr) => {
    if (error || stderr)
      console.log(`error: ${error?.message}\nstderr: ${stderr}`);
    if (stdout) {
      const files = stdout.toString().split("\n");
      const modifiedFilesInNewestCommit = files
        .slice(0, files.length - 1)
        .map((file) => file.split("/"));
      if (modifiedFilesInNewestCommit.length > 0) {
        const exceptions = getExceptionsConf().exceptions;
        console.log(
          "Do not run next command if only theses files were modified :\n",
          exceptions
        );

        const onlyExceptions = modifiedFilesInNewestCommit.every((path) =>
          exceptions.some((exception) => exception === path[0])
        );
        const result = { modifiedFilesInNewestCommit, onlyExceptions };
        console.log(result);
        process.exit(result.onlyExceptions ? -1 : 0);
      }
    }
    return;
  }
);
