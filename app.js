// Import required modules
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(bodyParser.json()); // Parse JSON requests

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Example route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Register User
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(sql, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error registering user:', err.message);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'Email already registered.' });
                }
                return res.status(500).json({ message: 'Error registering user. Please try again.' });
            } else {
                res.status(200).json({ message: 'User registered successfully' });
            }
        });
    } catch (error) {
        console.error('Error in try-catch:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying database' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Login successful
        res.status(200).json({ message: 'Login successful', user: { email: user.email } });
    });
});



app.get('/api/pets', (req, res) => {
    const limit = parseInt(req.query.limit) || 6;  // Pets per page (default: 6)
    const page = parseInt(req.query.page) || 1;    // Current page (default: 1)
    const offset = (page - 1) * limit;             // Calculate the offset

    const sql = `SELECT * FROM pets LIMIT ? OFFSET ?`; // Pagination query
    db.query(sql, [limit, offset], (err, results) => {
        if (err) {
            console.error('Error fetching pets:', err);
            return res.status(500).send('Error fetching pets');
        }

        // Query to get the total number of pets for pagination control
        db.query('SELECT COUNT(*) AS total FROM pets', (countErr, countResult) => {
            if (countErr) {
                console.error('Error counting pets:', countErr);
                return res.status(500).send('Error counting pets');
            }

            const totalPets = countResult[0].total;
            res.json({
                pets: results,
                totalPages: Math.ceil(totalPets / limit), // Calculate total number of pages
                currentPage: page
            });
        });
    });
});

// Serve repository.html
app.get('/repository', (req, res) => {
    res.sendFile(__dirname + '/repository.html');
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
