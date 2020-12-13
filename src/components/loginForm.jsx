import React, { useState } from 'react';
import Input from './common/input';

const LoginForm = () => {
  const [account, setAccount] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    let newAccount = { ...account };
    newAccount[e.target.name] = e.target.value;
    setAccount(newAccount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name='email'
        label='Email'
        value={account.email}
        onChange={handleChange}
      />
      <Input
        name='password'
        label='Password'
        value={account.password}
        onChange={handleChange}
      />
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
