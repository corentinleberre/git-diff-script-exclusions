import { Command } from "commander";
import exception from "./exception";

const program = new Command();

program
  .name("git-diff-script-exclusions")
  .version("3.1.0", "-v, --vers", "output the current version")
  .description(
    "Compare commits and determinate if modified files are strictly limited to path configured\n\n  > See README.md for configuration details"
  )
  .requiredOption(
    "-s, --source <string>",
    "source commit <commit_sha || branch_name>"
  )
  .option(
    "-t, --target <string>",
    "target commit <commit_sha || branch_name>", ''
  );

program.parse(process.argv);

exception(program.opts().source, program.opts().target);
