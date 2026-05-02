import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { cookingLevels } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [cookingLevel, setCookingLevel] = useState('medium');
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const level = product.hasCookingLevel ? cookingLevel : null;
    addToCart(product, level);
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="item-header">
          <span className="item-name">{product.name}</span>
          <span className="item-price">{product.price.toFixed(2)}₺</span>
        </div>
        <p className="item-desc">{product.description}</p>
        
        {product.hasCookingLevel && (
          <div className="cooking-level">
            <label htmlFor={`level-${product.id}`}>Cooking Level:</label>
            <select
              id={`level-${product.id}`}
              className="level-select"
              value={cookingLevel}
              onChange={(e) => setCookingLevel(e.target.value)}
            >
              {cookingLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          className="add-btn"
          onClick={handleAddToCart}
          style={isAdded ? { backgroundColor: 'var(--primary-color)' } : {}}
        >
          {isAdded ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
