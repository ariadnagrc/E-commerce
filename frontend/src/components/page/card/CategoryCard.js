import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ name, image }) => {
  return (
    <Link to={`/category/${name.toLowerCase()}`} className="category-card">
      <div className="category-image">
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
    </Link>
  );
};

export default CategoryCard;