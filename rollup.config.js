import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'dist/plugins.min.js',
      format: 'cjs',
    },
    plugins: [json(), commonjs(), babel(), uglify()],
  },
  {
    input: 'src/main.js',
    output: {
      file: 'dist/plugins.js',
      format: 'cjs',
    },
    plugins: [json(), commonjs(), babel()],
  },
]
