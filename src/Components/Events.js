import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../Firebase/config';
import { collection, getDocs, getDoc, deleteDoc, doc, where, query } from 'firebase/firestore';
import { format } from 'date-fns';
import Loader from './Loader';

function Events() {
  const [openday, setOpenday] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'openday', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const opendayData = docSnap.data();
        const q = query(collection(db, 'event'), where('openday', '==', id));
        const eventsQuerySnapshot = await getDocs(q);
        const events = await Promise.all(
          eventsQuerySnapshot.docs.map(async (eventDoc) => {
            const eventData = { id: eventDoc.id, ...eventDoc.data() };

            const q = query(collection(db, 'session'), where('event', '==', eventDoc.id));
            const sessionsQuerySnapshot = await getDocs(q);
            const sessions = await Promise.all(
              sessionsQuerySnapshot.docs.map(async (sessionDoc) => {
                return { id: sessionDoc.id, ...sessionDoc.data() };
              })
            );

            eventData.sessions = sessions;
            return eventData;
          })
        );

        opendayData.events = events;

        return opendayData;
      } else {
        console.error('No such document!');
      }
    }

    fetchData().then((opendayData) => {
      setOpenday(opendayData);
      setLoading(false);
    });
  }, []);

  const deleteEvent = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, 'event', id));
    const filteredEvents = openday.events.filter((event) => event.id !== id);
    setOpenday({ ...openday, events: filteredEvents });
  };

  if (isLoading) {
    return <Loader />;
  } else {
    const startDate = format(openday.starttime.toDate(), 'yyyy-MM-dd');
    return (
      <>
        <h1 className="text-2xl mb-8">
          Events page for {openday.title} - {startDate}
        </h1>

        <div className="relative overflow-x-auto mb-3">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Maplink
                </th>
                <th scope="col" className="px-6 py-3">
                  Maplabel
                </th>
                <th scope="col" className="px-6 py-3">
                  Sessions
                </th>
                <th scope="col" className="px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {console.log(openday)}
              {openday.events.map((event) => {
                return (
                  <tr
                    key={event.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {event.title}
                    </th>
                    <td className="px-6 py-4">{event.description}</td>
                    <td className="px-6 py-4">{event.maplink}</td>
                    <td className="px-6 py-4">{event.maplabel}</td>
                    <td className="px-6 py-4">
                      {event.sessions.map((session) => {
                        const startTime = format(session.starttime.toDate(), 'hh:mm a');
                        const endTime = format(session.endtime.toDate(), 'hh:mm a');
                        return (
                          <p key={session.id}>
                            {startTime} - {endTime}
                          </p>
                        );
                      })}
                    </td>
                    <td className="px-2 py-4">
                      <Link to={'/admin/editevent/' + event.id} className="btn bg-orange-600 mr-5">
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn bg-red-800"
                        onClick={() => deleteEvent(event.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link to="/admin/addevent" state={id} className="btn bg-gray-600 mt-5">
          Add an Event
        </Link>
      </>
    );
  }
}

export default Events;
