// Import the development configuration.
import createConfig from './rollup.config'

const config = createConfig('development')

config.onwarn = (warning) => {
  switch (warning.code) {
    case 'SOURCEMAP_BROKEN': return
    case 'MISSING_EXPORT': return

    default:
    case 'NON_EXISTENT_EXPORT':
    case 'UNUSED_EXTERNAL_IMPORT':
  }

  // console.warn everything else
  console.warn(warning.code, warning.message)
}

export default config
