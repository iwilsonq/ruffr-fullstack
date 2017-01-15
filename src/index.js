import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import ImageGallery from './components/ImageGallery';
import NewPost from './components/NewPost';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={ImageGallery} />
      <Route path='new' component={NewPost} />
    </Route>
  </Router>
);

render(
  routes,
  document.getElementById('root')
);
