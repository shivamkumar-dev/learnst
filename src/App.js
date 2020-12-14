import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Quizzes from './components/quizzes';
import Resource from './components/resource/resources';
import Home from './components/home';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route path='/signup'>
            <SignupForm />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path='/quizzes'>
            <Quizzes />
          </Route>
          <Route path='/resources'>
            <Resource />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
