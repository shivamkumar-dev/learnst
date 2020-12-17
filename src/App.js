import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import QuizDetails from './components/quiz/quizDetails';
import Quizzes from './components/quiz/quizzes';
import ResourceForm from './components/resource/resourceForm';
import Resource from './components/resource/resources';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import NotFound from './components/notFound';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route path='/signup' component={SignupForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/quizzes/:id' component={QuizDetails} />
          <Route path='/quizzes' component={Quizzes} />
          <Route path='/resources/:id' component={ResourceForm} />
          <Route path='/resources' component={Resource} />
          <Redirect path='/' exact to='/quizzes' />
          <Redirect to='/not-found' component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
