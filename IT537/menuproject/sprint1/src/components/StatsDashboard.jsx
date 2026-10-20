export default function StatsDashboard({ orders }) {
  const today = new Date().toDateString();
  const todayOrders = orders.filter(
    (order) => new Date(order.date).toDateString() === today
  );
  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Orders</h3>
        <div className="stat-value">{orders.length}</div>
      </div>
      <div className="stat-card">
        <h3>Pending Orders</h3>
        <div className="stat-value">{pendingOrders.length}</div>
      </div>
      <div className="stat-card">
        <h3>Total Revenue</h3>
        <div className="stat-value">{totalRevenue}₺</div>
      </div>
      <div className="stat-card">
        <h3>Today's Orders</h3>
        <div className="stat-value">{todayOrders.length}</div>
      </div>
    </div>
  );
}
