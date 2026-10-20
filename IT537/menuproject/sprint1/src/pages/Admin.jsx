import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StatsDashboard from '../components/StatsDashboard';
import OrdersTable from '../components/OrdersTable';
import { LogOut } from 'lucide-react';

export default function Admin() {
  const { user, logout } = useAuth();
  // Mock data for UI demo
  const [orders] = useState([
    { id: '101', customer: 'testuser', table: '5', total: 150, date: new Date().toISOString(), status: 'pending', items: [] },
    { id: '102', customer: 'demo', table: '3', total: 85, date: new Date().toISOString(), status: 'preparing', items: [] }
  ]);

  const handleStatusUpdate = (orderId, newStatus) => {
    console.log(`Update order ${orderId} to ${newStatus}`);
  };

  const handleRefresh = () => {
    console.log('Refresh clicked');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <img src="/veranda_logo.svg" alt="Veranda Cafe & Brasserie" className="admin-logo" />
          <h1>Admin Panel</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>
            Welcome, <span id="adminUsername">{user?.username}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="logout-btn" onClick={logout}>
            <LogOut size={16} style={{marginRight: '5px', verticalAlign: 'text-bottom'}}/>
            Logout
          </button>
        </div>
      </div>

      <StatsDashboard orders={orders} />
      
      <OrdersTable 
        orders={orders} 
        onStatusUpdate={handleStatusUpdate} 
        onRefresh={handleRefresh} 
      />
    </div>
  );
}
