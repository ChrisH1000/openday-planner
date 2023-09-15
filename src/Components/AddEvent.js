import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import flatpickr from 'flatpickr';
import extractTimePairs from '../Utils/extractTimePairs';
import { parse } from 'date-fns';

function AddEvent() {
  const { register, handleSubmit } = useForm();
  const [sessionCount, setSessionCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const opendayID = location.state;
  console.log(opendayID);

  useEffect(() => {
    console.log(sessionCount);
    flatpickr('#starttime' + sessionCount, {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      minTime: '09:00',
      maxTime: '16:00'
    });

    flatpickr('#endtime' + sessionCount, {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
      minTime: '09:00',
      maxTime: '16:00'
    });
  }, [sessionCount]);

  const onSubmit = async (data) => {
    data.openday = opendayID;
    const sessions = extractTimePairs(data);
    console.log(data);
    console.log(sessions);

    const docRef = await addDoc(collection(db, 'event'), data);
    console.log('Document written with ID: ', docRef.id);

    sessions.forEach(async (session) => {
      session.event = docRef.id;
      session.starttime = Timestamp.fromDate(
        parse(session.starttime, 'yyyy-MM-dd HH:mm', new Date())
      );
      session.endtime = Timestamp.fromDate(parse(session.endtime, 'yyyy-MM-dd HH:mm', new Date()));
      await addDoc(collection(db, 'session'), session);
    });
    navigate('/admin/events/' + opendayID);
  };

  return (
    <>
      <h1 className="text-2xl mb-8">Add Event</h1>
      <div className="addEvent-container">
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
                  <label htmlFor="description" className="inputLabel">
                    Description
                  </label>
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    required
                    className="textInput"
                    {...register('description')}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <label htmlFor="maplink" className="inputLabel">
                    Maplink
                  </label>
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    name="maplink"
                    id="maplink"
                    required
                    className="textInput"
                    {...register('maplink')}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <label htmlFor="maplabel" className="inputLabel">
                    Maplabel
                  </label>
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    name="maplabel"
                    id="maplabel"
                    required
                    className="textInput"
                    {...register('maplabel')}
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold">Sessions</h3>
              <div>
                {[...Array(sessionCount)].map((e, i) => {
                  i++;

                  const btn =
                    i > 1 ? (
                      <button
                        type="button"
                        className="btn bg-red-500"
                        onClick={() => setSessionCount(sessionCount - 1)}>
                        Remove session
                      </button>
                    ) : null;

                  return (
                    <div key={i} className="grid grid-cols-3 gap-4 mb-4">
                      <div className="inputWrapper">
                        <input
                          type="text"
                          name={'starttime' + i}
                          id={'starttime' + i}
                          required
                          className="textInput"
                          placeholder="start time"
                          {...register('starttime' + i)}
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          name={'endtime' + i}
                          id={'endtime' + i}
                          required
                          className="textInput"
                          placeholder="end time"
                          {...register('endtime' + i)}
                        />
                      </div>
                      {btn}
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                className="btn bg-yellow-500"
                onClick={() => setSessionCount(sessionCount + 1)}>
                Add session
              </button>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link
                  to={'/admin/events/' + opendayID}
                  className="btn bg-red-600 hover:bg-red-700 focus:ring-red-500">
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

export default AddEvent;
