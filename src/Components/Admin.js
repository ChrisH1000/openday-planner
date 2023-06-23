import React, { useEffect } from 'react';
import { db } from '../Firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import Header from './Header';

function Admin() {
  useEffect(() => {
    let opendays = [];
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'openday'));
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, ' => ', doc.data());
        opendays.push({ id: doc.id, ...doc.data() });

        /* const querySnapshot2 = await getDocs(collection(db, 'openday', doc.id, 'events'));
        querySnapshot2.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        }); */
      });
    }

    async function fetchData2(id) {
      let events = [];
      const querySnapshot2 = await getDocs(collection(db, 'openday', id, 'events'));
      querySnapshot2.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });

      return events;
    }
    fetchData().then(() => {
      console.log(opendays);
      opendays.forEach((openday) => {
        fetchData2(openday.id).then((events) => {
          openday.events = events;
        });
      });
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
