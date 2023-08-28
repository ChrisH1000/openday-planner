import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import flatpickr from 'flatpickr';

function AddOpenday() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    flatpickr('#starttime', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      minTime: '09:00',
      maxTime: '16:00'
    });

    flatpickr('#endtime', {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      minTime: '09:00',
      maxTime: '16:00'
    });
  }, []);

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
                  <label htmlFor="starttime" className="inputLabel">
                    Start time
                  </label>
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    name="starttime"
                    id="starttime"
                    required
                    className="textInput"
                    {...register('starttime')}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <label htmlFor="endtime" className="inputLabel">
                    End time
                  </label>
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    name="endtime"
                    id="endtime"
                    required
                    className="textInput"
                    {...register('endtime')}
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
