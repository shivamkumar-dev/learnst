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
          <Route path='/signup'>
            <SignupForm />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path='/quizzes/:id'>
            <QuizDetails />
          </Route>
          <Route path='/quizzes'>
            <Quizzes />
          </Route>
          <Route path='/resources/:id'>
            <ResourceForm />
          </Route>
          <Route path='/resources'>
            <Resource />
          </Route>
          <Route path='/not-found'>
            <NotFound />
          </Route>
          <Redirect path='/' exact to='/quizzes' />
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </div>
  );
}

export default App;
