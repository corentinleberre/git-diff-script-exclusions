import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/exception.js',
    plugins: [
      terser()
    ],
    output: {
      file: 'dist/exception.js',
      format: 'cjs'
    }
};