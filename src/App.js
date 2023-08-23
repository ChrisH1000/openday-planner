import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './Firebase/config';
import LoggedInRoute from './Router/LoggedInRoute';
import Login from './Components/Login';
import Plans from './Components/Plans';
import Admin from './Components/Admin';
import Signup from './Components/Signup';
import Header from './Components/Header';
import AddOpenday from './Components/AddOpenday';
import { UserProvider } from './Firebase/UserProvider';

function App() {
  return (
    <UserProvider>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
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
                  <Route exact path="/admin" element={<Admin />}>
                    <Route exact path="addopenday" element={<AddOpenday />} />
                  </Route>
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
