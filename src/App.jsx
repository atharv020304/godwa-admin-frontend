import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.jsx'; 
import Dashboard from './Pages/Dashboard.jsx';
import Exhibition from './Pages/Exhibition.jsx';
import ChangePassword from './Pages/ChangePassword.jsx';
import Event from './Pages/Event.jsx';
import UpdateEvent from './Pages/UpdateEvent.jsx';
import RegisterationList from './Pages/RegisterationList.jsx';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-exhibition" element={<Exhibition />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/review-event" element={<Event />} />
          <Route path="/update-event" element={<UpdateEvent />} />
          <Route path="/registerationdetails" element={<RegisterationList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
