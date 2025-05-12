import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Home from './components/page/home/Home';
import PrivateRoute from './configuration/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Ruta protegida */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;