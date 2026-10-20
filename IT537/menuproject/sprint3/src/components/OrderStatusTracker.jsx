import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { ClipboardList, ChevronDown, ChevronUp } from 'lucide-react';

const STATUS_LABELS = {
  pending: '⏳ Pending',
  preparing: '👨‍🍳 Preparing',
  ready: '✅ Ready',
  completed: '🏁 Completed'
};

const STATUS_STEPS = ['pending', 'preparing', 'ready', 'completed'];

export default function OrderStatusTracker({ username }) {
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const prevOrdersRef = useRef({});

  const fetchMyOrders = async () => {
    try {
      const allOrders = await api.fetchOrders();
      const myOrders = allOrders
        .filter(o => o.customer === username)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10); // Last 10 orders
      
      // Check for status changes
      myOrders.forEach(order => {
        const prevStatus = prevOrdersRef.current[order.id];
        if (prevStatus && prevStatus !== order.status) {
          showNotification(order.id, prevStatus, order.status);
        }
      });

      // Update ref
      const statusMap = {};
      myOrders.forEach(o => { statusMap[o.id] = o.status; });
      prevOrdersRef.current = statusMap;

      setOrders(myOrders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const showNotification = (orderId, oldStatus, newStatus) => {
    const shortId = orderId.length > 6 ? '...' + orderId.slice(-6) : orderId;
    setNotification({
      message: `Order #${shortId}: ${STATUS_LABELS[oldStatus] || oldStatus} → ${STATUS_LABELS[newStatus] || newStatus}`,
      status: newStatus
    });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    fetchMyOrders();
    const interval = setInterval(fetchMyOrders, 5000);
    return () => clearInterval(interval);
  }, [username]);

  const activeOrders = orders.filter(o => o.status !== 'completed');
  const completedOrders = orders.filter(o => o.status === 'completed');

  return (
    <>
      {/* Floating button */}
      <button
        className="order-status-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ClipboardList size={18} />
        Order Status
        {activeOrders.length > 0 && (
          <span className="order-status-badge">{activeOrders.length}</span>
        )}
      </button>

      {/* Status popup notification */}
      {notification && (
        <div className={`order-notification order-notification-${notification.status}`}>
          <div className="order-notification-icon">🔔</div>
          <div className="order-notification-text">{notification.message}</div>
        </div>
      )}

      {/* Orders panel */}
      {isOpen && (
        <>
          <div className="order-tracker-overlay" onClick={() => setIsOpen(false)}></div>
          <div className="order-tracker-panel">
            <div className="order-tracker-header">
              <h3>📋 My Orders</h3>
              <button className="order-tracker-close" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="order-tracker-content">
              {orders.length === 0 ? (
                <p className="order-tracker-empty">No orders yet. Place your first order!</p>
              ) : (
                <>
                  {activeOrders.length > 0 && (
                    <div className="order-tracker-section">
                      <h4 className="order-tracker-section-title">Active Orders</h4>
                      {activeOrders.map(order => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  )}

                  {completedOrders.length > 0 && (
                    <div className="order-tracker-section">
                      <h4 className="order-tracker-section-title" style={{ color: 'var(--text-secondary)' }}>
                        Completed ({completedOrders.length})
                      </h4>
                      {completedOrders.slice(0, 3).map(order => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const shortId = order.id.length > 6 ? '...' + order.id.slice(-6) : order.id;
  const currentStep = STATUS_STEPS.indexOf(order.status);

  return (
    <div className={`order-tracker-card order-tracker-card-${order.status}`}>
      <div className="order-tracker-card-header" onClick={() => setExpanded(!expanded)}>
        <div>
          <strong>#{shortId}</strong>
          <span className="order-tracker-table">Table {order.table || 'N/A'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`order-tracker-status order-tracker-status-${order.status}`}>
            {STATUS_LABELS[order.status]}
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Progress bar */}
      <div className="order-progress-bar">
        {STATUS_STEPS.map((step, i) => (
          <div key={step} className={`order-progress-step ${i <= currentStep ? 'active' : ''}`}>
            <div className="order-progress-dot"></div>
            {i < STATUS_STEPS.length - 1 && <div className="order-progress-line"></div>}
          </div>
        ))}
      </div>
      <div className="order-progress-labels">
        {STATUS_STEPS.map(step => (
          <span key={step} className={`order-progress-label ${step === order.status ? 'current' : ''}`}>
            {step.charAt(0).toUpperCase() + step.slice(1)}
          </span>
        ))}
      </div>

      {expanded && (
        <div className="order-tracker-details">
          <div className="order-tracker-items">
            {order.items.map((item, idx) => (
              <span key={idx} className="order-tracker-item">
                {item.name}{item.cookingLevel ? ` (${item.cookingLevel})` : ''}
              </span>
            ))}
          </div>
          <div className="order-tracker-meta">
            <span>{new Date(order.date).toLocaleTimeString()}</span>
            <span><strong>{order.total.toFixed(2)}₺</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}
