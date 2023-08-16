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
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <label htmlFor="email1" className="inputLabel">
                  Your email
                </label>
              </div>
              <div className="inputWrapper">
                <input
                  type="email"
                  name="email1"
                  id="email1"
                  required
                  className="textInput"
                  placeholder="john@doe.com"
                  {...register('email')}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="password1" className="inputLabel">
                  Your password
                </label>
              </div>
              <div className="inputWrapper">
                <input
                  type="password"
                  name="password1"
                  id="password1"
                  required
                  className="textInput"
                  {...register('password')}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="btn bg-green-300" onClick={openPopup}>
                Login with Google
              </button>
              <button type="submit" className="btn bg-indigo-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
