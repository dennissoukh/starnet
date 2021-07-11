import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useGeolocation from '../hooks/useGeolocation';
import ApplicationLayout from '../modules/layouts/ApplicationLayout';
import { useApplicationStore as useStore } from '../global-stores/useApplicationStore';
import '../styles/globals.css';
import Main from './Main';
import useLocalStorage from '../hooks/useLocalStorage';

const App: React.FC = () => {
  const { coords } = useGeolocation();
  const [storageGeolocation, setStorageGeolocation] = useLocalStorage('geolocation', null);
  const setGeolocation = useStore((state: any) => state.setGeolocation);

  useEffect(() => {
    if (coords) {
      setGeolocation(coords);
      setStorageGeolocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  }, [coords]);

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
