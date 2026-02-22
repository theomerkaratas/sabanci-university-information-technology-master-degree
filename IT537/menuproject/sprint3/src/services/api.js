const API_URL = '/api';

export const api = {
  // Auth
  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

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
  },

  // Leaderboard
  async fetchLeaderboard() {
    const response = await fetch(`${API_URL}/leaderboard`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return await response.json();
  },

  async fetchUserPoints(username) {
    const response = await fetch(`${API_URL}/users/${username}/points`);
    if (!response.ok) throw new Error('Failed to fetch points');
    return await response.json();
  },

  async spendPoints(username, pointsToSpend) {
    const response = await fetch(`${API_URL}/users/${username}/spend-points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pointsToSpend }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to spend points');
    return data;
  }
};
