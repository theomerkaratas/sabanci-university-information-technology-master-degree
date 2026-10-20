import { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose, onCheckout }) {
  const { cart, removeFromCart, removeOneByType, addOneMore, cartTotal } = useCart();

  // Group identical items
  const groupedCart = useMemo(() => {
    const groups = {};
    cart.forEach((item, index) => {
      const key = `${item.name}-${item.codingLevel || ''}`;
      if (!groups[key]) {
        groups[key] = { ...item, quantity: 0, indices: [], key };
      }
      groups[key].quantity++;
      groups[key].indices.push(index);
    });
    return Object.values(groups);
  }, [cart]);

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
                    </div>
                    <div className="cart-item-price">{(group.price * group.quantity).toFixed(2)}₺</div>
                  </div>
                  <div className="cart-item-quantity-row">
                    <div className="quantity-box">
                      <button
                        className="quantity-btn"
                        onClick={() => removeOneByType(group.name, group.codingLevel)}
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
          <div className="cart-total">
            <span>Total:</span>
            <span>{cartTotal.toFixed(2)}₺</span>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
