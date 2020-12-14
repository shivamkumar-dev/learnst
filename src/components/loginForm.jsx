import React, { useState } from 'react';
import Joi from 'joi';
import Input from './common/input';
import Button from './common/button';

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

  const validate = () => {
    const { error } = schema.validate(account, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    if (errors) setErrors(errors);
    else setErrors({});

    if (errors) return;

    // call the server
    console.log('submitted');
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const sub = schema.$_terms.keys.filter((i) => i.key === name);
    const subSchema = Joi.object({ [name]: sub[0].schema });
    const { error } = subSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ target: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    let newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);
  };

  return (
    <form onSubmit={handleSubmit} className='py-5'>
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
  );
};

export default LoginForm;
