import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../Firebase/config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Loader from './Loader';
import { format } from 'date-fns';

function Admin() {
  const [opendays, setOpendays] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'openday'));

      const odays = querySnapshot.docs.map(async (doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return Promise.all(odays);
    }

    fetchData().then((opendayData) => {
      setOpendays(opendayData);
      setLoading(false);
    });
  }, []);

  const deleteOpenday = async (id) => {
    await deleteDoc(doc(db, 'openday', id));
    setOpendays(opendays.filter((openday) => openday.id !== id));
  };

  if (isLoading) {
    return <Loader />;
  } else {
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
                <th scope="col" className="px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {console.log(opendays)}
              {opendays.map((openday) => {
                const startDate = format(openday.starttime.toDate(), 'yyyy-MM-dd');
                return (
                  <tr
                    key={openday.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link to={'/admin/events/' + openday.id}>{openday.title}</Link>
                    </th>
                    <td className="px-6 py-4">{startDate}</td>
                    <td className="px-6 py-4">{openday.location}</td>
                    <td className="px-6 py-4">{openday.status}</td>
                    <td className="px-2 py-4">
                      <Link
                        to={'/admin/editopenday/' + openday.id}
                        className="btn bg-orange-600 mr-5">
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn bg-red-800"
                        onClick={() => deleteOpenday(openday.id)}>
                        Delete
                      </button>
                    </td>
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
}

export default Admin;
