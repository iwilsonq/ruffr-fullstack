import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes';
import '../style/common.css';

render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('root')
);
