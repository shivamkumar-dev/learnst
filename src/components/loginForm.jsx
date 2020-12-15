import React, { useState } from 'react';
import Joi from 'joi';
import Input from './common/input';
import Button from './common/button';
import { validate, validateProperty } from '../utils/formValidation';

const LoginForm = () => {
  const [account, setAccount] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
    password: Joi.string().required().label('Password'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(account, schema);
    if (errors) setErrors(errors);
    else setErrors({});

    if (errors) return;

    // call the server
    console.log('submitted');
  };

  const handleChange = ({ target: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    let newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);
  };

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
        <Button type='submit' className='btn btn-primary' label='Login' />
      </form>
    </>
  );
};

export default LoginForm;
