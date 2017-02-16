import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader';

// Import the components.
import api from './api'
import App from './components/App'


// Define the root element.
const root = document.querySelector('main')

ReactDOM.render( <AppContainer><App/></AppContainer>, root);

if (module && module.hot) {
  module.hot.accept('./components/App.jsx', () => {
    const { App } = require('./components/App.jsx').default;
    ReactDOM.render(
      <AppContainer>
        <App/>
      </AppContainer>,
      root
    );
  });
}

