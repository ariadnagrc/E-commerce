import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ProductCard from '../card/ProductCard';
import CategoryCard from '../card/CategoryCard';

// Datos de ejemplo (en un proyecto real vendrían de una API)
const featuredProducts = [
  {
    id: 1,
    name: 'Zapatillas Running Pro',
    price: 89.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Smartwatch Ultra',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Auriculares Inalámbricos',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    rating: 4.2
  }
];

const categories = [
  { id: 1, name: 'Electrónica', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475' },
  { id: 2, name: 'Moda', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f' },
  { id: 3, name: 'Hogar', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba' }
];

function Home() {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = "/login";
  };

  return (
    <div className="home-container">
      {/* Navbar Superior */}
      <header className="main-header">
        <div className="header-container">
          <Link to="/" className="logo">ECOMMERCE</Link>
          
          <div className="search-bar">
            <input type="text" placeholder="Buscar productos..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          
          <nav className="main-nav">
            <ul>
              <li><Link to="/profile"><i className="fas fa-user"></i> Mi Cuenta</Link></li>
              <li><Link to="/cart"><i className="fas fa-shopping-cart"></i> Carrito</Link></li>
              <li><button onClick={handleLogout} className="logout-btn"><i className="fas fa-sign-out-alt"></i> Salir</button></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Ofertas de Temporada</h1>
          <p>Hasta 50% de descuento en productos seleccionados</p>
          <Link to="/products/sale" className="cta-button">Ver Ofertas</Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-section">
        <h2>Explora por Categorías</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <CategoryCard 
              key={category.id}
              name={category.name}
              image={category.image}
            />
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured-products">
        <h2>Productos Destacados</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              discount={product.discount}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>
        <Link to="/products" className="view-all">Ver todos los productos →</Link>
      </section>

      {/* Banner Promocional */}
      <section className="promo-banner">
        <div className="promo-content">
          <h3>Envío Gratis</h3>
          <p>En todos los pedidos superiores a $50</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ECOMMERCE</h4>
            <p>La mejor selección de productos al mejor precio.</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><Link to="/about">Sobre Nosotros</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
              <li><Link to="/faq">Preguntas Frecuentes</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ECOMMERCE. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;