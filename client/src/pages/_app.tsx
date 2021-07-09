import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApplicationLayout from '../modules/layouts/ApplicationLayout';
import '../styles/globals.css';
import Main from './Main';

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
      <Route path="/" exact component={Main}/>
    </Switch>
  )
}

export default App;
