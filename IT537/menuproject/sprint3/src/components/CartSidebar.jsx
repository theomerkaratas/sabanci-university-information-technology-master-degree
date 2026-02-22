import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Award } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose, onCheckout, userPoints = 0 }) {
  const { cart, removeFromCart, cartTotal } = useCart();
  const [usePointsPayment, setUsePointsPayment] = useState(false);

  const POINT_VALUE = 10; // 1 point = 10₺
  const maxDiscount = Math.min(userPoints * POINT_VALUE, cartTotal);
  const pointsNeeded = Math.ceil(cartTotal / POINT_VALUE);
  const hasEnoughPoints = userPoints >= pointsNeeded;
  const pointsToSpend = Math.ceil(maxDiscount / POINT_VALUE);
  const finalTotal = usePointsPayment ? cartTotal - maxDiscount : cartTotal;

  const handleCheckout = () => {
    onCheckout(usePointsPayment ? pointsToSpend : 0);
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">
                    {item.name}
                    {item.codingLevel && ` (${item.codingLevel})`}
                    {item.variant && item.variant !== 'classic' && ` (${item.variant})`}
                  </div>
                  <div className="cart-item-price">{item.price}₺</div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(index)}
                >
                  <Trash2 size={16} style={{marginRight: '5px', verticalAlign: 'text-bottom'}}/>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          {cart.length > 0 && (
            <div className="points-payment-section">
              <div className="points-payment-header">
                <Award size={18} />
                <span>Pay with Points</span>
                <span className="points-balance">{userPoints} pts</span>
              </div>
              
              {hasEnoughPoints ? (
                <div className="points-payment-option">
                  <label className="points-toggle">
                    <input
                      type="checkbox"
                      checked={usePointsPayment}
                      onChange={(e) => setUsePointsPayment(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">
                      Use {pointsToSpend} pts (-{maxDiscount}₺)
                    </span>
                  </label>
                </div>
              ) : (
                <div className="points-payment-warning">
                  ⚠️ Not enough points. You need {pointsNeeded} pts for this order. 
                  ({pointsNeeded - userPoints} more needed)
                </div>
              )}
            </div>
          )}

          <div className="cart-total">
            <span>Total:</span>
            <div style={{ textAlign: 'right' }}>
              {usePointsPayment && maxDiscount > 0 && (
                <div style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: 'var(--text-secondary)' }}>
                  {cartTotal}₺
                </div>
              )}
              <span>{finalTotal}₺</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            {usePointsPayment ? `Checkout (${pointsToSpend} pts + ${finalTotal}₺)` : 'Checkout'}
          </button>
        </div>
      </div>
    </>
  );
}
