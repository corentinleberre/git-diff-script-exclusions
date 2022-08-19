import typescript from "@rollup/plugin-typescript";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/main.ts",
  output: {
    file: "dist/exception.js",
    banner: "#!/usr/bin/env node",
    format: "cjs",
  },
  plugins: [
    typescript(),
    terser(),
    replace({
      delimiters: ["", ""],
      "#!/usr/bin/env node": "",
    }),
  ],
};
