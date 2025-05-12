import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });

      localStorage.setItem('jwt', response.data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>ECOMMERCE</h1>
          <h2>Bienvenido de vuelta</h2>
          <p>Inicia sesión para acceder a tu cuenta</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
          <Link to="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;