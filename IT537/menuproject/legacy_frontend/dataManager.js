const API_URL = '/api/orders';
const AUTH_URL = '/api';

class DataManager {
    static async registerUser(userData) {
        try {
            const response = await fetch(`${AUTH_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    static async loginUser(credentials) {
        try {
            const response = await fetch(`${AUTH_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async fetchOrdersFromServer() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch orders');
            return await response.json();
        } catch (error) {
            console.error('Error fetching orders:', error);
            return JSON.parse(localStorage.getItem('orders') || '[]');
        }
    }

    static async saveOrderToServer(order) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
            if (!response.ok) throw new Error('Failed to save order');
            return await response.json();
        } catch (error) {
            console.error('Error saving order:', error);
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    }

    static async updateOrderStatusOnServer(orderId, status) {
        try {
            const response = await fetch(`${API_URL}/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (!response.ok) throw new Error('Failed to update order status');
            return await response.json();
        } catch (error) {
            console.error('Error updating order status:', error);
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const index = orders.findIndex(o => o.id === orderId);
            if (index !== -1) {
                orders[index].status = status;
                localStorage.setItem('orders', JSON.stringify(orders));
            }
        }
    }

    static async exportOrdersToCSV() {
        const orders = await this.fetchOrdersFromServer();
        
        if (orders.length === 0) {
            alert('No orders to export!');
            return;
        }

        let csv = 'Order ID,Customer,Table,Total,Date,Status,Items\n';

        orders.forEach(order => {
            const items = order.items.map(item => 
                `${item.name}${item.cookingLevel ? ` (${item.cookingLevel})` : ''} - ${item.price}₺`
            ).join('; ');

            csv += `${order.id},${order.customer},${order.table || 'N/A'},${order.total}₺,${order.date},${order.status},"${items}"\n`;
        });

        this.downloadCSV(csv, `orders_${new Date().toISOString().split('T')[0]}.csv`);
    }

    static exportLoginActivityToCSV() {
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
        
        if (loginHistory.length === 0) {
            alert('No login activity to export!');
            return;
        }

        let csv = 'Username,User Type,Login Time,IP Address\n';

        loginHistory.forEach(login => {
            csv += `${login.username},${login.type},${login.loginTime},${login.ipAddress || 'N/A'}\n`;
        });

        this.downloadCSV(csv, `login_activity_${new Date().toISOString().split('T')[0]}.csv`);
    }

    static async exportAllDataToCSV() {
        const orders = await this.fetchOrdersFromServer();
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');

        let csv = '=== ORDERS DATA ===\n';
        csv += 'Order ID,Customer,Table,Total,Date,Status,Items\n';

        orders.forEach(order => {
            const items = order.items.map(item => 
                `${item.name}${item.cookingLevel ? ` (${item.cookingLevel})` : ''} - ${item.price}₺`
            ).join('; ');

            csv += `${order.id},${order.customer},${order.table || 'N/A'},${order.total}₺,${order.date},${order.status},"${items}"\n`;
        });

        csv += '\n=== LOGIN ACTIVITY ===\n';
        csv += 'Username,User Type,Login Time,IP Address\n';

        loginHistory.forEach(login => {
            csv += `${login.username},${login.type},${login.loginTime},${login.ipAddress || 'N/A'}\n`;
        });

        this.downloadCSV(csv, `all_data_${new Date().toISOString().split('T')[0]}.csv`);
    }

    static importOrdersFromCSV(file) {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            const text = e.target.result;
            const lines = text.split('\n').filter(line => line.trim());
            const dataLines = lines.slice(1);
            
            for (const line of dataLines) {
                const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
                if (matches && matches.length >= 7) {
                    const [id, customer, table, total, date, status, items] = matches.map(m => m.replace(/^"|"$/g, '').trim());
                    
                    const parsedItems = items.split(';').map(item => {
                        const itemParts = item.trim().split(' - ');
                        const nameAndLevel = itemParts[0];
                        const price = parseFloat(itemParts[1]?.replace('₺', '') || 0);
                        let name = nameAndLevel, cookingLevel = null;
                        const levelMatch = nameAndLevel.match(/(.+?)\s*\((.+?)\)/);
                        if (levelMatch) {
                            name = levelMatch[1].trim();
                            cookingLevel = levelMatch[2].trim();
                        }
                        return { name, price, cookingLevel };
                    });

                    const order = {
                        id, customer,
                        table: table !== 'N/A' ? parseInt(table) : null,
                        total: parseFloat(total.replace('₺', '')),
                        date, status, items: parsedItems
                    };
                    
                    await this.saveOrderToServer(order);
                }
            }
            alert(`Import finished!`);
            window.location.reload();
        };

        reader.readAsText(file);
    }

    static downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    static autoSaveOrderToCSV(order) {
        console.log('Order logged locally (deprecated):', order.id);
    }

    static logLogin(username, userType) {
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
        const loginEntry = {
            username,
            type: userType,
            loginTime: new Date().toISOString(),
            ipAddress: 'Local'
        };
        loginHistory.push(loginEntry);
        localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
    }

    static clearAllData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
            localStorage.removeItem('orders');
            localStorage.removeItem('loginHistory');
            alert('Local data cleared! Server data (order.csv) remains.');
            window.location.reload();
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
