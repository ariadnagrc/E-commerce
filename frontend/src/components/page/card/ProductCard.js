import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, name, price, discount, image, rating }) => {
  const discountedPrice = discount ? (price * (1 - discount / 100)).toFixed(2) : null;

  return (
    <div className="product-card">
      {discount && <span className="discount-badge">-{discount}%</span>}
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3><Link to={`/product/${id}`}>{name}</Link></h3>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fas fa-star ${i < Math.floor(rating) ? 'filled' : ''} ${i === Math.floor(rating) && rating % 1 > 0 ? 'half-filled' : ''}`}
            ></i>
          ))}
          <span>({rating})</span>
        </div>
        <div className="price">
          {discountedPrice ? (
            <>
              <span className="original-price">${price.toFixed(2)}</span>
              <span className="current-price">${discountedPrice}</span>
            </>
          ) : (
            <span className="current-price">${price.toFixed(2)}</span>
          )}
        </div>
        <button className="add-to-cart">Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;