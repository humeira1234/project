const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql2.createConnection({
    host: 'localhost',    // Your MySQL host
    user: 'root',         // Your MySQL user
    password: 'Khadija123456789',  // Your MySQL password
    database: 'event' // Your MySQL database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// User Registration
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check for existing user
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create new user (consider hashing the password before storing)
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.' });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    });
});

// User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        res.status(200).json({ message: 'Login successful!' });
    });
});

// Create Event
app.post('/api/create-event', (req, res) => {
    const { eventName, eventDate, eventTime, eventLocation, eventDescription, eventCapacity } = req.body;

    // Basic validation
    if (!eventName || !eventDate || !eventTime || !eventLocation || !eventDescription || !eventCapacity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create new event
    db.query('INSERT INTO events (eventName, eventDate, eventTime, eventLocation, eventDescription, eventCapacity) VALUES (?, ?, ?, ?, ?, ?)', 
    [eventName, eventDate, eventTime, eventLocation, eventDescription, eventCapacity], 
    (err) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        res.status(201).json({ message: 'Event created successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

