import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ImageGallery from './components/ImageGallery';
import NewPost from './components/NewPost';
import Login from './components/auth/Login';

const routes = (
  <Route> 
    <Route path='login' component={Login} />
    <Route path='/' component={App}>
      <IndexRoute component={ImageGallery} />
      <Route path='new' component={NewPost} />
    </Route>
  </Route>
);

export default routes;
