import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);


