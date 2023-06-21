import React, { useEffect } from 'react';
import { db } from '../Firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import Header from './Header';

function Admin() {
  useEffect(() => {
    async function fetchData() {
      console.log('Admin page');
      const querySnapshot = await getDocs(collection(db, 'openday'));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h1>Admin page</h1>
    </>
  );
}

export default Admin;
