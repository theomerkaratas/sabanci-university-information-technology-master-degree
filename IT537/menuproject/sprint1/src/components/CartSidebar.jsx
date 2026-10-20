import { useCart } from '../context/CartContext';
import { X, Trash2 } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose, onCheckout }) {
  const { cart, removeFromCart, cartTotal } = useCart();

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
          <div className="cart-total">
            <span>Total:</span>
            <span>{cartTotal}₺</span>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
