import React, { useEffect } from 'react';
import { db } from '../Firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import Header from './Header';

function Admin() {
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'openday'));

      const opendays = querySnapshot.docs.map(async (doc) => {
        const opendayData = { id: doc.id, ...doc.data() };

        const subQuerySnapshot = await getDocs(collection(db, 'openday', doc.id, 'events'));
        const events = subQuerySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        opendayData.events = events;

        return opendayData;
      });

      return Promise.all(opendays);
    }

    fetchData().then((opendays) => {
      console.log(opendays);
    });
  }, []);

  return (
    <>
      <Header />
      <h1>Admin page</h1>
    </>
  );
}

export default Admin;
