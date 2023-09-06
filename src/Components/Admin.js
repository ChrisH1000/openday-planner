import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../Firebase/config';
import { collection, getDocs } from 'firebase/firestore';

function Admin() {
  const [opendays, setOpendays] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'openday'));

      const odays = querySnapshot.docs.map(async (doc) => {
        const opendayData = { id: doc.id, ...doc.data() };

        const eventsQuerySnapshot = await getDocs(collection(db, 'openday', doc.id, 'events'));
        const events = await Promise.all(
          eventsQuerySnapshot.docs.map(async (eventDoc) => {
            const eventData = { id: eventDoc.id, ...eventDoc.data() };

            const sessionsQuerySnapshot = await getDocs(
              collection(db, 'openday', doc.id, 'events', eventDoc.id, 'sessions')
            );
            const sessions = sessionsQuerySnapshot.docs.map((sessionDoc) => {
              return { id: sessionDoc.id, ...sessionDoc.data() };
            });

            eventData.sessions = sessions;

            return eventData;
          })
        );

        opendayData.events = events;

        return opendayData;
      });

      return Promise.all(odays);
    }

    fetchData().then((opendayData) => {
      setOpendays(opendayData);
    });
  }, []);

  return (
    <>
      <h1 className="text-2xl mb-8">Admin page</h1>

      <div className="relative overflow-x-auto mb-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Start date
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log(opendays)}
            {opendays.map((openday) => {
              const dateFormat = new Date(openday.starttime.seconds * 1000);
              const startDate = `${dateFormat.getDate()}/${
                dateFormat.getMonth() + 1
              }/${dateFormat.getFullYear()}`;
              return (
                <tr
                  key={openday.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to="/admin/editopenday/{openday.id}">{openday.title}</Link>
                  </th>
                  <td className="px-6 py-4">{startDate}</td>
                  <td className="px-6 py-4">{openday.location}</td>
                  <td className="px-6 py-4">{openday.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link to="/admin/addopenday" className="btn bg-gray-600 mt-5">
        Add an Openday
      </Link>
    </>
  );
}

export default Admin;
