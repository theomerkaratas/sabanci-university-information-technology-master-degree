import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import StatsDashboard from '../components/StatsDashboard';
import OrdersTable from '../components/OrdersTable';
import { LogOut, Download, Upload } from 'lucide-react';

export default function Admin() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await api.fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Export Logic (simplified version of DataManager)
  const exportToCSV = (data, filename) => {
    const csvContent = "data:text/csv;charset=utf-8," + data;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateOrdersCSV = () => {
     let csv = 'Order ID,Customer,Table,Total,Date,Status,Items\n';
     orders.forEach(order => {
        const items = order.items.map(item => 
            `${item.name}${item.cookingLevel ? ` (${item.cookingLevel})` : ''} - ${item.price}₺`
        ).join('; ');
        csv += `${order.id},${order.customer},${order.table || 'N/A'},${order.total}₺,${order.date},${order.status},"${items}"\n`;
     });
     return csv;
  };

  const handleExportOrders = () => {
      const csv = generateOrdersCSV();
      exportToCSV(csv, `orders_${new Date().toISOString().split('T')[0]}.csv`);
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
          <button className="export-btn" onClick={handleExportOrders} title="Export Orders">
            <Download size={16} style={{marginRight: '5px', verticalAlign: 'text-bottom'}}/>
            Orders CSV
          </button>
          
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
        onRefresh={fetchOrders} 
      />
    </div>
  );
}
