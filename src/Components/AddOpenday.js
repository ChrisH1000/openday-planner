import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function AddOpenday() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(isLoading);
    console.log(data);
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-2xl mb-8">Add Openday</h1>
      <div className="addopenday-container">
        <div className="ui card login-card">
          <div className="content">
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="mb-2 block">
                  <label htmlFor="title" className="inputLabel">
                    Title
                  </label>
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="textInput"
                    {...register('title')}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <label htmlFor="location" className="inputLabel">
                    Location
                  </label>
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    className="textInput"
                    {...register('location')}
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
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/admin" className="btn bg-red-600 hover:bg-red-700 focus:ring-red-500">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn bg-green-600 hover:bg-green-700 focus:ring-green-500">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOpenday;
