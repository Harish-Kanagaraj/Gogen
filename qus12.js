
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './login';
import Logout from './logout';
import ProtectedComponent from './ProtectedComponent';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/" component={ProtectedComponent} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
