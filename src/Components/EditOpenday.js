import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { parse } from 'date-fns';
import flatpickr from 'flatpickr';

function EditOpenday() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(false);

    data.starttime = Timestamp.fromDate(parse(data.starttime, 'yyyy-MM-dd HH:mm', new Date()));
    data.endtime = Timestamp.fromDate(parse(data.endtime, 'yyyy-MM-dd HH:mm', new Date()));

    console.log(data);

    const docRef = await addDoc(collection(db, 'openday'), data);
    console.log('Document written with ID: ', docRef.id);
    navigate('/admin');
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
              <div>
                <div className="mb-2 block">
                  <label htmlFor="status" className="inputLabel">
                    Status
                  </label>
                </div>
                <div className="inputWrapper">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="status"
                    id="status"
                    required
                    {...register('status')}>
                    <option value="Live">Live</option>
                    <option value="Disabled">Disabled</option>
                  </select>
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

export default EditOpenday;
