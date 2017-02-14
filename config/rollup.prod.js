// Rollup plugins.
import uglify from 'rollup-plugin-uglify'

// Import the development configuration.
import createConfig from './rollup.config'

const config = createConfig('production')

// Inject the production settings.
config.dest = 'build/app.min.js'
config.plugins.push([uglify()])

export default config
