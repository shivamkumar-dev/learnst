import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Quizzes from './components/quizzes';
import Resource from './components/resources';
import Home from './components/home';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route path='/login'>
            <LoginForm />
          </Route>
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
    </div>
  );
}

export default App;
