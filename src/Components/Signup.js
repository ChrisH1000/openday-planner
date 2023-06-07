import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { signup } from '../Firebase/auth';

function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(isLoading);
    let newUser;
    setLoading(true);
    try {
      newUser = await signup(data);
      reset();

      if (newUser) {
        <Navigate to="/plans" />;
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="two fields">
              <div className="field">
                <label>
                  First Name
                  <input {...register('firstName')} />
                </label>
              </div>
              <div className="field">
                <label>
                  Last Name
                  <input {...register('lastName')} />
                </label>
              </div>
            </div>
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
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
