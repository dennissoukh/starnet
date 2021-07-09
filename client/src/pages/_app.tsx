import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApplicationLayout from '../modules/layouts/ApplicationLayout';
import '../styles/globals.css';
import Dashboard from './Dashboard';
import Stars from './Stars';

const App: React.FC = () => {
  return (
    <Router>
      <ApplicationLayout>
        {renderRoute()}
      </ApplicationLayout>
    </Router>
  );
}

const renderRoute = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard}/>
      <Route path="/stars" exact component={Stars}/>
    </Switch>
  )
}

export default App;
