// Rollup plugins.
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

import config from './rollup.dev'

config.plugins = config.plugins.concat([
  serve({
    contentBase: '',
    host: 'localhost',
    port: 8888
  }),      // index.html should be in root of project
  livereload()
])

export default config
