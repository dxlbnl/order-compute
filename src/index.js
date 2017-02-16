// Import React and React-dom.
import React from 'react'
import ReactDOM from 'react-dom'

// Import the components.
import api from './api'
import { Order } from './components'
import './style.css'

// Define the root element.
const root = document.querySelector('main')


// Append the Component to the root element.
ReactDOM.render(<Order prices={api.prices()}/>, root)
