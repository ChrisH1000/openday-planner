import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './Firebase/config';
import AdminRoute from './Router/AdminRoute';
import LoggedInRoute from './Router/LoggedInRoute';
import Login from './Components/Login';
import Plans from './Components/Plans';
import Admin from './Components/Admin';
import Signup from './Components/Signup';
import { UserProvider } from './Firebase/UserProvider';
import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} errorElement={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/admin" element={<AdminRoute />}>
            <Route exact path="/admin" element={<Admin />} />
          </Route>
          <Route exact path="/plans" element={<LoggedInRoute />}>
            <Route exact path="/plans" element={<Plans />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
