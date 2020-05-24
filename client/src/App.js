import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/navbar'

function App() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <Switch>
      </Switch>
    </div>
  );
}

export default App;
