import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Award, ChevronUp, ChevronDown } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose, onCheckout, userPoints = 0 }) {
  const { cart, removeFromCart, removeOneByType, addOneMore, cartTotal } = useCart();
  const [usePointsPayment, setUsePointsPayment] = useState(false);

  const POINT_VALUE = 10; // 1 point = 10₺
  const maxDiscount = Math.min(userPoints * POINT_VALUE, cartTotal);
  const pointsNeeded = Math.ceil(cartTotal / POINT_VALUE);
  const hasEnoughPoints = userPoints >= pointsNeeded;
  const pointsToSpend = Math.ceil(maxDiscount / POINT_VALUE);
  const finalTotal = usePointsPayment ? cartTotal - maxDiscount : cartTotal;

  // Group identical items
  const groupedCart = useMemo(() => {
    const groups = {};
    cart.forEach((item, index) => {
      const key = `${item.name}-${item.codingLevel || ''}-${item.variant || ''}`;
      if (!groups[key]) {
        groups[key] = { ...item, quantity: 0, indices: [], key };
      }
      groups[key].quantity++;
      groups[key].indices.push(index);
    });
    return Object.values(groups);
  }, [cart]);

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
            groupedCart.map((group) =>
              group.quantity > 3 ? (
                /* Grouped view for items with quantity > 3 */
                <div key={group.key} className="cart-item cart-item-grouped">
                  <div className="cart-item-info">
                    <div className="cart-item-name">
                      {group.name}
                      {group.codingLevel && ` (${group.codingLevel})`}
                      {group.variant && group.variant !== 'classic' && ` (${group.variant})`}
                    </div>
                    <div className="cart-item-price">{(group.price * group.quantity).toFixed(2)}₺</div>
                  </div>
                  <div className="cart-item-quantity-row">
                    <div className="quantity-box">
                      <button
                        className="quantity-btn"
                        onClick={() => removeOneByType(group.name, group.codingLevel, group.variant)}
                        title="Decrease"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <span className="quantity-value">x {group.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => addOneMore(group)}
                        title="Increase"
                      >
                        <ChevronUp size={16} />
                      </button>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => {
                        group.indices.sort((a, b) => b - a).forEach(i => removeFromCart(i));
                      }}
                    >
                      <Trash2 size={16} style={{marginRight: '5px', verticalAlign: 'text-bottom'}}/>
                      Remove All
                    </button>
                  </div>
                </div>
              ) : (
                /* Individual view for items with quantity <= 3 */
                group.indices.map((idx) => (
                  <div key={idx} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">
                        {cart[idx].name}
                        {cart[idx].codingLevel && ` (${cart[idx].codingLevel})`}
                        {cart[idx].variant && cart[idx].variant !== 'classic' && ` (${cart[idx].variant})`}
                      </div>
                      <div className="cart-item-price">{cart[idx].price.toFixed(2)}₺</div>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(idx)}
                    >
                      <Trash2 size={16} style={{marginRight: '5px', verticalAlign: 'text-bottom'}}/>
                      Remove
                    </button>
                  </div>
                ))
              )
            )
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
                      Use {pointsToSpend} pts (-{maxDiscount.toFixed(2)}₺)
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
                  {cartTotal.toFixed(2)}₺
                </div>
              )}
              <span>{finalTotal.toFixed(2)}₺</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            {usePointsPayment ? `Checkout (${pointsToSpend} pts + ${finalTotal.toFixed(2)}₺)` : 'Checkout'}
          </button>
        </div>
      </div>
    </>
  );
}
