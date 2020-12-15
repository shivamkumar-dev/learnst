import React, { useState } from 'react';
import Joi from 'joi';
import Input from './common/input';
import Button from './common/button';
import { validate, validateProperty } from '../utils/formValidation';

const SignupForm = () => {
  const [account, setAccount] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const schema = Joi.object().keys({
    name: Joi.string().required().label('Name'),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
    password: Joi.string().min(5).required().label('Password'),
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
      <h1 className='py-5'>Signup</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name='name'
          label='Name'
          type='text'
          value={account.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          name='email'
          label='Email'
          type='text'
          value={account.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          name='password'
          label='Password'
          type='password'
          value={account.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type='submit' className='btn btn-primary' label='Signup' />
      </form>
    </>
  );
};

export default SignupForm;
