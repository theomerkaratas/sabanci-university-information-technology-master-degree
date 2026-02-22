import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import TableSelectionModal from '../components/TableSelectionModal';
import { ShoppingCart, LogOut, UtensilsCrossed, XCircle } from 'lucide-react';

export default function Menu() {
  const { user, logout, activeTable, occupyTable, leaveTable } = useAuth();
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

    // If table is already selected, skip modal
    if (activeTable) {
        completeOrder(activeTable);
    } else {
        setIsTableModalOpen(true);
    }
  };

  const handleTableSelect = (tableNumber) => {
    occupyTable(tableNumber);
    setIsTableModalOpen(false);
    completeOrder(tableNumber);
  };

  const completeOrder = (tableNumber) => {
    // Mock order placement for UI demo
    clearCart();
    showToast(`Order placed for Table ${tableNumber}!`);
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
          
          {activeTable && (
             <div className="active-table-badge" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '8px',
                 background: 'rgba(255, 255, 255, 0.1)',
                 padding: '5px 10px',
                 borderRadius: '20px',
                 border: '1px solid var(--accent-color)'
             }}>
                <UtensilsCrossed size={16} color="var(--accent-color)" />
                <span style={{color: 'var(--accent-color)', fontWeight: 'bold'}}>Table {activeTable}</span>
                <button 
                    onClick={leaveTable}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    title="Leave Table"
                >
                    <XCircle size={16} className="hover-red" />
                </button>
             </div>
          )}

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
        activeTable={activeTable}
      />

      <TableSelectionModal 
        isOpen={isTableModalOpen} 
        onClose={() => setIsTableModalOpen(false)} 
        onSelectTable={handleTableSelect}
        currentTable={activeTable}
      />

      {toastMessage && (
        <div className={`toast show`}>
            {toastMessage}
        </div>
      )}
    </>
  );
}
