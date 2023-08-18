import React, { useEffect, useState } from 'react';
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
      <h1>Admin page</h1>

      {console.log(opendays)}
      {opendays.map((openday) => {
        return <p key={openday.id}>{openday.title}</p>;
      })}
    </>
  );
}

export default Admin;
