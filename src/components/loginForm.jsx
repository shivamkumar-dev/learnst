import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi';
import Input from './common/input';
import { validate, validateProperty } from '../utils/formValidation';
import { login, getCurrentUser } from '../services/authService';

const LoginForm = () => {
  // States
  const [account, setAccount] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Login Form Schema
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
    password: Joi.string().required().label('Password'),
  });

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate whole Form on Submition
    const errors = validate(account, schema);
    if (errors) setErrors(errors);
    else setErrors({});

    if (errors) return;

    // User Login
    try {
      await login(account);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const loginErrors = { ...errors };
        loginErrors.email = ex.response.data;
        setErrors(loginErrors);
      }
    }
  };

  const handleChange = ({ target: input }) => {
    // Validate Individual Form Elements
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    let newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);
  };

  if (getCurrentUser()) return <Redirect to='/' />;

  // Form
  return (
    <div className='row-cols-md-3'>
      <div className='mx-auto'>
        <h1 className='py-3'>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name='email'
            label='Email'
            value={account.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            name='password'
            label='Password'
            value={account.password}
            type='password'
            onChange={handleChange}
            error={errors.password}
          />
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
