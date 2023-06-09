import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './Firebase/config';
// import AdminRoute from './Router/AdminRoute';
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
          <Route exact path="/" element={<LoggedInRoute props="empty" />}>
            <Route exact path="/" element={<Signup />} />
          </Route>
          <Route exact path="/login" element={<LoggedInRoute props="login" />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route exact path="/signup" element={<LoggedInRoute props="signup" />}>
            <Route exact path="/signup" element={<Signup />} />
          </Route>
          <Route exact path="/plans" element={<LoggedInRoute props="plans" />}>
            <Route exact path="/plans" element={<Plans />} />
          </Route>
          <Route exact path="/admin" element={<LoggedInRoute props="admin" />}>
            <Route exact path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
