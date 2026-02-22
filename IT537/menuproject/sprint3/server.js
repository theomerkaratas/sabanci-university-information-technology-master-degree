import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3003;

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
        fs.writeFileSync(USER_FILE, 'Username,Password,Type,ActiveTable,Points\n');
        fs.appendFileSync(USER_FILE, 'customer,customer123,customer,,0\n');
    } else {
        // Migrate: add Points column if missing
        const content = fs.readFileSync(USER_FILE, 'utf8');
        const firstLine = content.split('\n')[0];
        if (!firstLine.includes('Points')) {
            const lines = content.split('\n');
            const newLines = lines.map((line, i) => {
                if (i === 0) return line.trim() + ',Points';
                if (line.trim()) return line.trim() + ',0';
                return line;
            });
            fs.writeFileSync(USER_FILE, newLines.join('\n'));
        }
    }
}

function checkCredentials(filePath, username, password) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(s => s.trim());
        const [u, p, t, at, pts] = parts;
        if (u === username && p === password) {
            return { username: u, type: t, activeTable: at || null, points: parseInt(pts) || 0 };
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

    const newUserLine = `${username},${password},customer,,0\n`;
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

// Table Management
app.post('/api/tables/occupy', (req, res) => {
    const { username, table } = req.body;
    ensureFiles();

    // Check if table is occupied by someone else
    const content = fs.readFileSync(USER_FILE, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    
    for (let i = 1; i < lines.length; i++) {
        const [u, p, t, at] = lines[i].split(',');
        if (u !== username && at === String(table)) {
             return res.status(400).json({ message: `Table ${table} is already occupied.` });
        }
    }

    // Update user's active table
    let found = false;
    const newLines = lines.map((line, index) => {
        if (index === 0) return line; // Header
        const parts = line.split(',');
        const [u, p, t, at, pts] = parts;
        if (u === username) {
            found = true;
            return `${u},${p},${t},${table},${pts || 0}`;
        }
        return line;
    });

    if (!found) return res.status(404).json({ message: 'User not found' });

    fs.writeFileSync(USER_FILE, newLines.join('\n') + '\n');
    res.json({ success: true, activeTable: table });
});

app.post('/api/tables/release', (req, res) => {
    const { username } = req.body;
    ensureFiles();

    const content = fs.readFileSync(USER_FILE, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    
    let found = false;
    const newLines = lines.map((line, index) => {
        if (index === 0) return line;
        const parts = line.split(',');
        const [u, p, t, at, pts] = parts;
        if (u === username) {
            found = true;
            return `${u},${p},${t},,${pts || 0}`; // Clear active table, keep points
        }
        return line;
    });

    if (!found) return res.status(404).json({ message: 'User not found' });

    fs.writeFileSync(USER_FILE, newLines.join('\n') + '\n');
    res.json({ success: true });
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

    // Add loyalty points: total / 100 (floored)
    const earnedPoints = Math.floor(order.total / 100);
    if (earnedPoints > 0 && order.customer) {
        const userContent = fs.readFileSync(USER_FILE, 'utf8');
        const userLines = userContent.split('\n').filter(l => l.trim());
        let updated = false;
        const newUserLines = userLines.map((line, index) => {
            if (index === 0) return line;
            const parts = line.split(',').map(s => s.trim());
            const [u, p, t, at, pts] = parts;
            if (u === order.customer) {
                updated = true;
                const newPts = (parseInt(pts) || 0) + earnedPoints;
                return `${u},${p},${t},${at || ''},${newPts}`;
            }
            return line;
        });
        if (updated) {
            fs.writeFileSync(USER_FILE, newUserLines.join('\n') + '\n');
        }
    }

    res.status(201).json({ message: 'Order saved', order, earnedPoints });
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

// Leaderboard - get all users sorted by points
app.get('/api/leaderboard', (req, res) => {
    ensureFiles();
    const content = fs.readFileSync(USER_FILE, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    const users = [];
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(s => s.trim());
        const [u, p, t, at, pts] = parts;
        users.push({ username: u, points: parseInt(pts) || 0 });
    }
    users.sort((a, b) => b.points - a.points);
    res.json(users);
});

// Get points for a specific user
app.get('/api/users/:username/points', (req, res) => {
    ensureFiles();
    const { username } = req.params;
    const content = fs.readFileSync(USER_FILE, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(s => s.trim());
        const [u, p, t, at, pts] = parts;
        if (u === username) {
            return res.json({ username: u, points: parseInt(pts) || 0 });
        }
    }
    res.status(404).json({ message: 'User not found' });
});

// Spend points (1 point = 10₺)
app.post('/api/users/:username/spend-points', (req, res) => {
    ensureFiles();
    const { username } = req.params;
    const { pointsToSpend } = req.body;

    if (!pointsToSpend || pointsToSpend <= 0) {
        return res.status(400).json({ message: 'Invalid points amount' });
    }

    const content = fs.readFileSync(USER_FILE, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    let found = false;
    let currentPoints = 0;

    const newLines = lines.map((line, index) => {
        if (index === 0) return line;
        const parts = line.split(',').map(s => s.trim());
        const [u, p, t, at, pts] = parts;
        if (u === username) {
            found = true;
            currentPoints = parseInt(pts) || 0;
            if (currentPoints < pointsToSpend) return line; // not enough
            const newPts = currentPoints - pointsToSpend;
            return `${u},${p},${t},${at || ''},${newPts}`;
        }
        return line;
    });

    if (!found) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (currentPoints < pointsToSpend) {
        return res.status(400).json({ message: 'Not enough points', currentPoints });
    }

    fs.writeFileSync(USER_FILE, newLines.join('\n') + '\n');
    res.json({ message: 'Points spent', remainingPoints: currentPoints - pointsToSpend, discount: pointsToSpend * 10 });
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
