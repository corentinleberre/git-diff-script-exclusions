#!/usr/bin/env node

import { exec } from "child_process";
import * as fs from "fs";

interface ScriptConfiguration {
  exceptions: Array<string>;
}

const [SHA1, SHA2] = process.argv.slice(2, 4);

if (SHA1) {
  if (SHA2) console.log(`INFO : Comparing : ${SHA1} to : ${SHA2}\n`);
  else console.log(`INFO : Comparing local modifications to : ${SHA1}\n`);
} else {
  console.log("INFO : Comparing local modifications to HEAD\n");
}

const getExceptionsConf = (): ScriptConfiguration => {
  try {
    let fileContents = fs.readFileSync("./exceptions.conf.json");
    return JSON.parse(fileContents.toString());
  } catch (err) {
    console.log(
      "ERROR : You have to create the file exceptions.conf.json with your exceptions\n"
    );
  }
};

const exceptionsConf = getExceptionsConf();

if (exceptionsConf?.exceptions?.length > 0) {
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
          const exceptions = exceptionsConf.exceptions;
          console.log("Exceptions configured :\n", exceptions, "\n");

          const onlyExceptions = modifiedFilesInNewestCommit.every((path) =>
            exceptions.some((exception) => exception === path[0])
          );
          const result = { modifiedFilesInNewestCommit, onlyExceptions };
          console.log(result, "\n");
          process.exitCode = result.onlyExceptions ? -1 : 0;
        }
      }
    }
  );
} else {
  console.log("ERROR : You have to add exceptions in exceptions.conf.json\n");
}
