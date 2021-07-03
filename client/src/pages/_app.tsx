import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      {renderRoute()}
    </Router>
  );
}

const renderRoute = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard}/>
    </Switch>
  )
}

export default App;
