import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        name,
        email,
        password,
      });
      
      localStorage.setItem('jwt', response.data.token);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar. Verifica los datos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>ECOMMERCE</h1>
          <h2>Crear nueva cuenta</h2>
          <p>Únete a nuestra comunidad</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">¡Registro exitoso! Redirigiendo...</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>

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

          <button type="submit" disabled={isLoading} className="register-button">
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Registrarse'
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>¿Ya tienes una cuenta? <Link to="/login" className="login-link">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;