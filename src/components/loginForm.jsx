import React, { useState } from 'react';
import Joi from 'joi';
import Input from './common/input';
import { validate, validateProperty } from '../utils/formValidation';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate whole Form on Submition
    const errors = validate(account, schema);
    if (errors) setErrors(errors);
    else setErrors({});

    if (errors) return;

    // call the server
    console.log('submitted');
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

  // Form
  return (
    <>
      <h1 className='py-5'>Login</h1>
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
    </>
  );
};

export default LoginForm;
