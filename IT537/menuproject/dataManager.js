// Data Manager - CSV Export/Import System

class DataManager {
    // Export orders to CSV
    static exportOrdersToCSV() {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        if (orders.length === 0) {
            alert('No orders to export!');
            return;
        }

        // CSV Header
        let csv = 'Order ID,Customer,Table,Total,Date,Status,Items\n';

        // CSV Rows
        orders.forEach(order => {
            const items = order.items.map(item => 
                `${item.name}${item.cookingLevel ? ` (${item.cookingLevel})` : ''} - ${item.price}₺`
            ).join('; ');

            csv += `${order.id},${order.customer},${order.table || 'N/A'},${order.total}₺,${order.date},${order.status},"${items}"\n`;
        });

        // Download CSV
        this.downloadCSV(csv, `orders_${new Date().toISOString().split('T')[0]}.csv`);
    }

    // Export login activity to CSV
    static exportLoginActivityToCSV() {
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
        
        if (loginHistory.length === 0) {
            alert('No login activity to export!');
            return;
        }

        // CSV Header
        let csv = 'Username,User Type,Login Time,IP Address\n';

        // CSV Rows
        loginHistory.forEach(login => {
            csv += `${login.username},${login.type},${login.loginTime},${login.ipAddress || 'N/A'}\n`;
        });

        // Download CSV
        this.downloadCSV(csv, `login_activity_${new Date().toISOString().split('T')[0]}.csv`);
    }

    // Export all data (combined)
    static exportAllDataToCSV() {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
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

        // Download CSV
        this.downloadCSV(csv, `all_data_${new Date().toISOString().split('T')[0]}.csv`);
    }

    // Import orders from CSV
    static importOrdersFromCSV(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const text = e.target.result;
            const lines = text.split('\n').filter(line => line.trim());
            
            // Skip header
            const dataLines = lines.slice(1);
            const orders = [];

            dataLines.forEach(line => {
                // Parse CSV line (handle quoted fields)
                const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
                if (matches && matches.length >= 7) {
                    const [id, customer, table, total, date, status, items] = matches.map(m => m.replace(/^"|"$/g, '').trim());
                    
                    // Parse items
                    const parsedItems = items.split(';').map(item => {
                        const itemParts = item.trim().split(' - ');
                        const nameAndLevel = itemParts[0];
                        const price = parseFloat(itemParts[1]?.replace('₺', '') || 0);
                        
                        let name = nameAndLevel;
                        let cookingLevel = null;
                        
                        const levelMatch = nameAndLevel.match(/(.+?)\s*\((.+?)\)/);
                        if (levelMatch) {
                            name = levelMatch[1].trim();
                            cookingLevel = levelMatch[2].trim();
                        }
                        
                        return { name, price, cookingLevel };
                    });

                    orders.push({
                        id,
                        customer,
                        table: table !== 'N/A' ? parseInt(table) : null,
                        total: parseFloat(total.replace('₺', '')),
                        date,
                        status,
                        items: parsedItems
                    });
                }
            });

            // Save to localStorage
            localStorage.setItem('orders', JSON.stringify(orders));
            alert(`Successfully imported ${orders.length} orders!`);
            
            // Reload page to reflect changes
            window.location.reload();
        };

        reader.readAsText(file);
    }

    // Download CSV helper
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

    // Auto-save to CSV (create and download)
    static autoSaveOrderToCSV(order) {
        // Append to existing orders in localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Create CSV for the new order
        let csv = 'Order ID,Customer,Table,Total,Date,Status,Items\n';
        
        const items = order.items.map(item => 
            `${item.name}${item.cookingLevel ? ` (${item.cookingLevel})` : ''} - ${item.price}₺`
        ).join('; ');

        csv += `${order.id},${order.customer},${order.table || 'N/A'},${order.total}₺,${order.date},${order.status},"${items}"\n`;

        // Note: Auto-download can be annoying, so we'll just log it
        console.log('Order CSV data:', csv);
        
        // Optionally store in sessionStorage for batch download
        const sessionOrders = JSON.parse(sessionStorage.getItem('sessionOrders') || '[]');
        sessionOrders.push(order);
        sessionStorage.setItem('sessionOrders', JSON.stringify(sessionOrders));
    }

    // Log login activity
    static logLogin(username, userType) {
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
        
        const loginEntry = {
            username,
            type: userType,
            loginTime: new Date().toISOString(),
            ipAddress: 'Local' // In a real app, you'd get this from backend
        };

        loginHistory.push(loginEntry);
        localStorage.setItem('loginHistory', JSON.stringify(loginHistory));

        console.log('Login logged:', loginEntry);
    }

    // Clear all data
    static clearAllData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
            localStorage.removeItem('orders');
            localStorage.removeItem('loginHistory');
            sessionStorage.removeItem('sessionOrders');
            alert('All data cleared!');
            window.location.reload();
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
