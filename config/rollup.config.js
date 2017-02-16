// Rollup plugins.
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
// import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default (environment) => ({
  dest: 'build/app.js',
  entry: 'src/index.js',
  format: 'iife',
  plugins: [
    resolve({
      jsnext: true
    }),
    commonjs({
      sourceMap: false
    }),
    postcss({
      extensions: [ '.css' ]
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ], 'stage-1', 'react' ],
      plugins: [ 'external-helpers' ]
    }),
    // globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(environment) })
  ],
  sourceMap: true
})
