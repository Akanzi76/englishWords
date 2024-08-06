const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Veritabanı bağlantısı
const dbPath = '/home/lightofgod/vsCodeProjects/WEB/database.db';
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Veritabanı başarıyla açıldı.');
    }
});

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Veri ekleme
app.post('/add', (req, res) => {
    const { eng_Write, tr_Write, eng_Read } = req.body;
    db.run(`INSERT INTO users (eng_Write, tr_Write, eng_Read) VALUES (?, ?, ?)`, [eng_Write, tr_Write, eng_Read], function(err) {
        if (err) {
            return res.status(400).json({ message: 'Ekleme hatası.' });
        }
        res.json({ message: 'Data Added Successfully.' });
    });
});

// Verileri sorgulama
app.get('/query', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ message: 'Sorgu hatası.' });
        }
        res.json(rows);
    });
});

// Rastgele veri sorgulama
app.get('/query/random', (req, res) => {
    db.get(`SELECT id, eng_Write, tr_Write, eng_Read FROM users ORDER BY RANDOM() LIMIT 1`, [], (err, row) => {
        if (err) {
            return res.status(400).json({ message: 'Sorgu hatası.' });
        }
        res.json(row ? row : {});
    });
});

// Silme işlemi
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM users WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(400).json({ message: 'Silme işlemi başarısız.' });
        }
        res.json({ message: 'Veri başarıyla silindi.' });
    });
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} <= (CTRL+Click)`);
});
