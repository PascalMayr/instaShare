import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/navbar'
import Home from './pages/home'
import Login from './pages/users/login'
import SignUp from './pages/users/signup'

function App() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users/' component={SignUp}/>
        <Route exact path='/users/login/' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
