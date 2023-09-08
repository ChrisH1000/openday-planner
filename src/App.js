import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './Firebase/config';
import LoggedInRoute from './Router/LoggedInRoute';
import Login from './Components/Login';
import Plans from './Components/Plans';
import Admin from './Components/Admin';
import Signup from './Components/Signup';
import Header from './Components/Header';
import Events from './Components/Events';
import AddOpenday from './Components/AddOpenday';
import EditOpenday from './Components/EditOpenday';
import { UserProvider } from './Firebase/UserProvider';

import 'flatpickr/dist/flatpickr.min.css';

function App() {
  return (
    <UserProvider>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoggedInRoute props="empty" />}>
                  <Route path="/" element={<Signup />} />
                </Route>
                <Route path="/login" element={<LoggedInRoute props="login" />}>
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/signup" element={<LoggedInRoute props="signup" />}>
                  <Route path="/signup" element={<Signup />} />
                </Route>
                <Route path="/plans" element={<LoggedInRoute props="plans" />}>
                  <Route path="/plans" element={<Plans />} />
                </Route>
                <Route path="/admin" element={<LoggedInRoute props="admin" />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="/admin/events/:id" element={<LoggedInRoute props="events" />}>
                  <Route path="/admin/events/:id" element={<Events />} />
                </Route>
                <Route path="/admin/addopenday" element={<LoggedInRoute props="addopenday" />}>
                  <Route path="/admin/addopenday" element={<AddOpenday />} />
                </Route>
                <Route
                  path="/admin/editopenday/:id"
                  element={<LoggedInRoute props="editopenday" />}>
                  <Route path="/admin/editopenday/:id" element={<EditOpenday />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </BrowserRouter>
          </div>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
