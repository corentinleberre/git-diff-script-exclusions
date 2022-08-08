import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";

export default {
  input: "dist/exception.js",
  plugins: [
    terser(),
    replace({
      delimiters: ["", ""],
      "#!/usr/bin/env node": "",
    }),
  ],
  output: {
    file: "dist/exception.js",
    banner: "#!/usr/bin/env node",
    format: "cjs",
  },
};
