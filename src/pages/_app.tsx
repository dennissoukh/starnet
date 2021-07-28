import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApplicationLayout from '../modules/layouts/ApplicationLayout';
import '../styles/globals.css';
import Main from './Main';
import useLocalStorage from '../hooks/useLocalStorage';
import { Geolocation, StoredGeolocation } from '../shared-components/Geolocation';

const App: React.FC = () => {
  const [storageGeolocation,] = useLocalStorage('geolocation', null);

  return (
    <>
      {storageGeolocation ? <StoredGeolocation/> : <Geolocation/>}
      <Router>
        <ApplicationLayout>
          {renderRoute()}
        </ApplicationLayout>
      </Router>
    </>
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
