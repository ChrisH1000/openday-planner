import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Navigate, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddOpenday() {
  const { register, handleSubmit } = useForm();
  const [isLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(isLoading);
    console.log(data);
    /* let newUser;
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
    } */
  };

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-2 block">
                <label htmlFor="fname" className="inputLabel">
                  Title
                </label>
              </div>
              <div className="inputWrapper">
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  required
                  className="textInput"
                  {...register('firstName')}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="lname" className="inputLabel">
                  Last Name
                </label>
              </div>
              <div className="inputWrapper">
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  required
                  className="textInput"
                  {...register('lastName')}
                />
              </div>
            </div>
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
            <div className="flex items-center gap-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="remember" className="inputLabel">
                Remember me
              </label>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link to="/login" className="btn bg-gray-600">
                Login
              </Link>
              <button type="submit" className="btn bg-indigo-600">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddOpenday;
