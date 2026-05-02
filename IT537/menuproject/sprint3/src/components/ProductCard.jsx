import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { cookingLevels } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [cookingLevel, setCookingLevel] = useState('medium');
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.value || null);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = () => {
    const level = product.hasCookingLevel ? cookingLevel : null;
    const variant = product.hasVariant ? selectedVariant : null;
    addToCart(product, level, variant);
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="card">
      {product.image && !imgError && (
        <div className="card-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="card-image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="card-price-badge">{product.price.toFixed(2)}₺</div>
        </div>
      )}
      <div className="card-body">
        <div className="item-header">
          <span className="item-name">{product.name}</span>
          {(!product.image || imgError) && (
            <span className="item-price">{product.price.toFixed(2)}₺</span>
          )}
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

        {product.hasVariant && product.variants && (
          <div className="cooking-level">
            <label htmlFor={`variant-${product.id}`}>Type:</label>
            <select
              id={`variant-${product.id}`}
              className="level-select"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {product.variants.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
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
