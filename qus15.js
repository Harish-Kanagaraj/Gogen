import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch,useParams } from 'react-router-dom';

// Lazy-loaded components
const Home = React.lazy(() => import('./Component/Home'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));

class Co extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
            </Suspense>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Co;
