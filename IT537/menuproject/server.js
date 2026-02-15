const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const CSV_FILE = path.join(__dirname, 'order.csv');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Helper to ensure CSV exists and has header
function ensureCsvFile() {
    if (!fs.existsSync(CSV_FILE) || fs.statSync(CSV_FILE).size === 0) {
        fs.writeFileSync(CSV_FILE, 'Order ID,Customer,Table,Total,Date,Status,Items\n');
    }
}

// Helper to parse complex CSV lines (handle quoted fields)
function parseCsvLine(line) {
    const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
    if (!matches) return null;
    return matches.map(m => m.replace(/^"|"$/g, '').trim());
}

// API: Get all orders from CSV
app.get('/api/orders', (req, res) => {
    ensureCsvFile();
    const content = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    const orders = [];

    // Skip header
    for (let i = 1; i < lines.length; i++) {
        const parts = parseCsvLine(lines[i]);
        if (parts && parts.length >= 7) {
            const [id, customer, table, total, date, status, itemsStr] = parts;
            
            // Parse items string
            const items = itemsStr.split(';').map(item => {
                const itemParts = item.trim().split(' - ');
                const nameAndLevel = itemParts[0];
                const priceMatch = itemParts[1]?.match(/(\d+)₺/);
                const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
                
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
                items
            });
        }
    }
    res.json(orders);
});

// API: Save new order to CSV
app.post('/api/orders', (req, res) => {
    ensureCsvFile();
    const order = req.body;
    
    const itemsStr = order.items.map(item => 
        `${item.name}${item.cookingLevel ? ` (${item.cookingLevel})` : ''} - ${item.price}₺`
    ).join('; ');

    const csvLine = `${order.id},${order.customer},${order.table || 'N/A'},${order.total}₺,${order.date},${order.status},"${itemsStr}"\n`;
    
    fs.appendFileSync(CSV_FILE, csvLine);
    res.status(201).json({ message: 'Order saved', order });
});

// API: Update order status in CSV
app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    ensureCsvFile();
    const content = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = content.split('\n');
    let found = false;

    const newLines = lines.map(line => {
        const parts = parseCsvLine(line);
        if (parts && parts[0] === id) {
            parts[5] = status; // Update status field
            found = true;
            // Re-wrap items in quotes if they contain commas/semicolons
            const items = parts[6].includes('"') ? parts[6] : `"${parts[6]}"`;
            return `${parts[0]},${parts[1]},${parts[2]},${parts[3]},${parts[4]},${parts[5]},${items}`;
        }
        return line;
    });

    if (found) {
        fs.writeFileSync(CSV_FILE, newLines.join('\n'));
        res.json({ message: 'Order status updated' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// Routes for specific HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// CSV handling routes (optional enhancement)
// Currently project uses client-side localStorage and downloads
// We can add server-side persistence later if needed

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
