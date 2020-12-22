import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NewQuiz from './components/quiz/newQuizForm';
import QuizDetails from './components/quiz/quizDetails';
import Quizzes from './components/quiz/quizzes';
import ResourceForm from './components/resource/resourceForm';
import Resource from './components/resource/resources';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import SignupForm from './components/signupForm';
import NotFound from './components/notFound';
import ProtectedRoute from './components/common/protectedRoute';
import AdminProtectedRoute from './components/common/adminProtectedRoute';
import './App.css';

const App = () => {
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
          <Route path='/logout'>
            <Logout />
          </Route>
          <ProtectedRoute path='/quizzes/new' component={<NewQuiz />} />
          <Route path='/quizzes/:id'>
            <QuizDetails />
          </Route>
          <Route path='/quizzes'>
            <Quizzes />
          </Route>
          <AdminProtectedRoute
            path='/resources/:id'
            component={<ResourceForm />}
          />
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
};

export default App;
