import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/Login/login';
import Home from './components/Home/home';
import Menu from './components/Menu/menu';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/menu" component={Menu} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
