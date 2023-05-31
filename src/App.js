import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './Firebase/config';
import AdminRoute from './Router/AdminRoute';
import Login from './Components/Login';
import Plans from './Components/Plans';
import Signup from './Components/Signup';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Login />} errorElement={<Login />} />
        <Route exact path="/" element={<AdminRoute />}>
          <Route exact path="/plans" element={<Plans />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
