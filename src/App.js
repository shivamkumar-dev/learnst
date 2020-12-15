import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Quizzes from './components/quiz/quizzes';
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
          <Route path='/signup' component={SignupForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/quizzes' component={Quizzes} />
          <Route path='/resources' component={Resource} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
