import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { login, loginGoogle } from '../Firebase/auth';

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(isLoading);
    let user;
    setLoading(true);
    try {
      user = await login(data);
      reset();
    } catch (error) {
      console.log(error);
    }

    if (user) {
      <Navigate to="/plans" />;
    } else {
      setLoading(false);
    }
  };

  const openPopup = async () => {
    let user;
    setLoading(true);
    try {
      user = await loginGoogle();
      console.log('hello');
      // reset();
    } catch (error) {
      console.log(error);
    }

    if (user) {
      <Navigate to="/plans" />;
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label>
                Email
                <input {...register('email')} />
              </label>
            </div>
            <div className="field">
              <label>
                Password
                <input {...register('password')} />
              </label>
            </div>
            <div className="field actions">
              <button className="ui primary button login" type="submit">
                Login
              </button>
            </div>
          </form>
          <button className="ui primary button login" onClick={openPopup}>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
