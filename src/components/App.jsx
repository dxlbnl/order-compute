import React from 'react'

import Order from './Order'
import api from '../api'

export default () => (<Order prices={api.prices()} />)
