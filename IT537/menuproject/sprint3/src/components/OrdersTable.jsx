import { useState } from 'react';
import { api } from '../services/api';

export default function OrdersTable({ orders, onStatusUpdate, onTableUpdate, onRefresh }) {
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((order) => order.status === filter);

  // Sort by date descending
  const sortedOrders = [...filteredOrders].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleStatusChange = async (orderId, newStatus) => {
    if (!newStatus) return;
    try {
        await api.updateOrderStatus(orderId, newStatus);
        onStatusUpdate(orderId, newStatus);
    } catch (error) {
        console.error('Failed to update status', error);
        alert('Failed to update status');
    }
  };

  const handleTableChange = async (orderId, newTable) => {
    const tableNum = parseInt(newTable);
    if (isNaN(tableNum)) return;
    try {
        await api.updateOrderTable(orderId, tableNum);
        if (onTableUpdate) onTableUpdate(orderId, tableNum);
    } catch (error) {
        console.error('Failed to update table', error);
        alert('Failed to update table');
    }
  };

  return (
    <div className="orders-section">
      <div className="orders-header">
        <h2>Orders Management</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="filter-buttons">
            {['all', 'pending', 'preparing', 'ready', 'completed'].map((status) => (
              <button
                key={status}
                className={`filter-btn ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <button className="refresh-btn" onClick={onRefresh}>
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Table</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-orders">
                  No orders found
                </td>
              </tr>
            ) : (
              sortedOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>#{order.id}</strong>
                  </td>
                  <td>
                    <select
                      className="action-select"
                      value={order.table || ''}
                      onChange={(e) => handleTableChange(order.id, e.target.value)}
                      style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}
                    >
                      {!order.table && <option value="">N/A</option>}
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>Table {num}</option>
                      ))}
                    </select>
                  </td>
                  <td>{order.customer}</td>
                  <td className="order-items">
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name}
                        {item.cookingLevel ? ` (${item.cookingLevel})` : ''}
                        {idx < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </td>
                  <td>
                    <strong>{order.total.toFixed(2)}₺</strong>
                  </td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <select
                      className="action-select"
                      value={order.status} // Controlled just to show current status, but logic uses onchange
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="pending" disabled={order.status === 'pending'}>Pending</option>
                      <option value="preparing" disabled={order.status === 'preparing'}>Preparing</option>
                      <option value="ready" disabled={order.status === 'ready'}>Ready</option>
                      <option value="completed" disabled={order.status === 'completed'}>Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
