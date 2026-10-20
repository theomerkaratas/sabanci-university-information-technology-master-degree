import { useState } from 'react';

export default function OrdersTable({ orders, onStatusUpdate, onRefresh }) {
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((order) => order.status === filter);

  // Sort by date descending
  const sortedOrders = [...filteredOrders].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Mock status change — no backend in Sprint 1
  const handleStatusChange = (orderId, newStatus) => {
    if (!newStatus) return;
    onStatusUpdate(orderId, newStatus);
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
                    <strong style={{ color: 'var(--primary-color)' }}>
                      Table {order.table || 'N/A'}
                    </strong>
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
                    <strong>{order.total}₺</strong>
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
