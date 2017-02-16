// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default (environment) => ({
  dest: 'build/app.js',
  entry: 'src/index.js',
  format: 'iife',
  plugins: [
    postcss({
      extensions: [ '.css' ],
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'stage-0', 'react' ],
      plugins: [ 'external-helpers' ]
    }),
    resolve({
      browser: true,
      main: true,
      jsnext: true
    }),
    cjs({
      exclude: [
        'node_modules/process-es6/**',
      ],
      include: [
        'node_modules/**'
        // 'node_modules/object-assign/**',
        // 'node_modules/react/**',
        // 'node_modules/react-dom/**'
      ]
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(environment) })
  ],
  sourceMap: true
})
