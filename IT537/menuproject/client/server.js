import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const CSV_FILE = path.join(__dirname, 'database', 'order.csv');
const USER_FILE = path.join(__dirname, 'database', 'user.csv');
const ADMIN_FILE = path.join(__dirname, 'database', 'admin.csv');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

ensureFiles();

function ensureFiles() {
    if (!fs.existsSync(CSV_FILE) || fs.statSync(CSV_FILE).size === 0) {
        fs.writeFileSync(CSV_FILE, 'Order ID,Customer,Table,Total,Date,Status,Items\n');
    }

    if (!fs.existsSync(ADMIN_FILE) || fs.statSync(ADMIN_FILE).size === 0) {
        fs.writeFileSync(ADMIN_FILE, 'Username,Password,Type\n');
        
        let adminFound = false;
        if (fs.existsSync(USER_FILE)) {
            const userContent = fs.readFileSync(USER_FILE, 'utf8');
            const lines = userContent.split('\n');
            const adminLine = lines.find(l => l.startsWith('admin,'));
            if (adminLine) {
                fs.appendFileSync(ADMIN_FILE, adminLine + '\n');
                adminFound = true;
                const newUserContent = lines.filter(l => !l.startsWith('admin,')).join('\n');
                fs.writeFileSync(USER_FILE, newUserContent);
            }
        }
        
        if (!adminFound) {
            fs.appendFileSync(ADMIN_FILE, 'admin,admin123,admin\n');
        }
    }

    if (!fs.existsSync(USER_FILE) || fs.statSync(USER_FILE).size === 0) {
        fs.writeFileSync(USER_FILE, 'Username,Password,Type\n');
        fs.appendFileSync(USER_FILE, 'customer,customer123,customer\n');
    }
}

function checkCredentials(filePath, username, password) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    for (let i = 1; i < lines.length; i++) {
        const [u, p, t] = lines[i].split(',');
        if (u === username && p === password) {
            return { username: u, type: t };
        }
    }
    return null;
}

function parseCsvLine(line) {
    const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
    if (!matches) return null;
    return matches.map(m => m.replace(/^"|"$/g, '').trim());
}

app.post('/api/register', (req, res) => {
    ensureFiles();
    const { username, password } = req.body;
    
    const contentUser = fs.readFileSync(USER_FILE, 'utf8');
    const contentAdmin = fs.readFileSync(ADMIN_FILE, 'utf8');
    
    const existsInUser = contentUser.split('\n').some(l => l.split(',')[0] === username);
    const existsInAdmin = contentAdmin.split('\n').some(l => l.split(',')[0] === username);

    if (existsInUser || existsInAdmin) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUserLine = `${username},${password},customer\n`;
    fs.appendFileSync(USER_FILE, newUserLine);
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    ensureFiles();
    const { username, password } = req.body;
    
    const admin = checkCredentials(ADMIN_FILE, username, password);
    if (admin) return res.json(admin);

    const customer = checkCredentials(USER_FILE, username, password);
    if (customer) return res.json(customer);

    res.status(401).json({ message: 'Invalid username or password' });
});

app.get('/api/orders', (req, res) => {
    ensureFiles();
    const content = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    const orders = [];

    for (let i = 1; i < lines.length; i++) {
        const parts = parseCsvLine(lines[i]);
        if (parts && parts.length >= 7) {
            const [id, customer, table, total, date, status, itemsStr] = parts;
            
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

app.post('/api/orders', (req, res) => {
    ensureFiles();
    const order = req.body;
    
    const itemsStr = order.items.map(item => 
        `${item.name}${item.cookingLevel ? ` (${item.cookingLevel})` : ''} - ${item.price}₺`
    ).join('; ');

    const csvLine = `${order.id},${order.customer},${order.table || 'N/A'},${order.total}₺,${order.date},${order.status},"${itemsStr}"\n`;
    
    fs.appendFileSync(CSV_FILE, csvLine);
    res.status(201).json({ message: 'Order saved', order });
});

app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    ensureFiles();
    const content = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = content.split('\n');
    let found = false;

    const newLines = lines.map(line => {
        const parts = parseCsvLine(line);
        if (parts && parts[0] === id) {
            parts[5] = status;
            found = true;
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

app.get('/', (req, res) => {
    res.send('API Server is running. Frontend is served separately (e.g. port 5173 or 7070).');
});

// app.get('/main', (req, res) => {
//     res.sendFile(path.join(__dirname, 'main.html'));
// });

// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'admin.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
