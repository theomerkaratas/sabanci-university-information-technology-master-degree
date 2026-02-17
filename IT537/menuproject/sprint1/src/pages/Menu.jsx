import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import TableSelectionModal from '../components/TableSelectionModal';
import { ShoppingCart, LogOut } from 'lucide-react';

export default function Menu() {
  const { user, logout } = useAuth();
  const { cart, clearCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const sectionsToRender = selectedCategory === 'all'
    ? categories.filter(c => c.id !== 'all')
    : categories.filter(c => c.id === selectedCategory);

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }
    setIsCartOpen(false);
    setIsTableModalOpen(true);
  };

  const handleTableSelect = (tableNumber) => {
    // Mock order placement for UI demo
    clearCart();
    setIsTableModalOpen(false);
    showToast(`Order placed for Table ${tableNumber}! (Demo Only)`);
  };

  const showToast = (msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <>
      <header>
        <h1>IT-537 <span>Fine DINING</span></h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span id="userWelcome" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Welcome, {user?.username}
          </span>
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={18} style={{marginRight: '5px', verticalAlign: 'middle'}}/>
            Cart ({cart.length})
          </button>
          <button className="logout-btn" onClick={logout}>
            <LogOut size={18} style={{marginRight: '5px', verticalAlign: 'middle'}}/>
            Logout
          </button>
        </div>
      </header>

      <nav className="category-nav">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      <div className="menu-container">
        {sectionsToRender.map(cat => {
            const catProducts = products.filter(p => p.category === cat.id);
            if (catProducts.length === 0) return null;
            
            return (
                <section key={cat.id} className="category-section">
                    <h2 className="category-title">{cat.name}</h2>
                    <div className="grid">
                        {catProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            );
        })}
      </div>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout} 
      />

      <TableSelectionModal 
        isOpen={isTableModalOpen} 
        onClose={() => setIsTableModalOpen(false)} 
        onSelectTable={handleTableSelect}
      />

      {toastMessage && (
        <div className={`toast show`}>
            {toastMessage}
        </div>
      )}
    </>
  );
}
