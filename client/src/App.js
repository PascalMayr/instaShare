import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/navbar'
import Home from './pages/home'

function App() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
