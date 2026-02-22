const API_URL = '/api';

export const api = {
  // Auth
  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  // Orders
  async fetchOrders() {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  },

  async saveOrder(order) {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to save order');
    return await response.json();
  },

  async updateOrderStatus(orderId, status) {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return await response.json();
  },

  // Table Management
  async occupyTable(username, table) {
    const response = await fetch(`${API_URL}/tables/occupy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, table }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to occupy table');
    return data;
  },

  async releaseTable(username) {
    const response = await fetch(`${API_URL}/tables/release`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to release table');
    return data;
  }
};
