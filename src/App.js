import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Quizzes from './components/quizzes';
import Resource from './components/resources';
import Home from './components/home';
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
    <main>
      <Navbar />
      <div className='container album py-5'>
        <Switch>
          <Route path='/quizzes'>
            <Quizzes />
          </Route>
          <Route path='/resources'>
            <Resource />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default App;
