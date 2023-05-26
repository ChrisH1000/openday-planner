import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element="Login" />
        <Route exact path="/plans" element="Plans" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
