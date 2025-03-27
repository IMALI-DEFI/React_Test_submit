const express = require('express');
const app = express();
const port = 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Bypass MongoDB connection
console.log("⚠️ Running in mock mode - no MongoDB required");

// Simple test route
app.get('/', (req, res) => {
  res.send('Server is working! Login at POST /api/user/login');
});

// Mock user routes
app.post('/api/user/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin@gmail.com' && password === 'admin123') {
    return res.json({
      token: 'mock-jwt-token',
      user: { id: 1, name: 'Admin' }
    });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});
// Mock database
let meetings = [];
let nextMeetingId = 1;

// Create Meeting
app.post('/api/meetings', (req, res) => {
  const meeting = {
    id: nextMeetingId++,
    title: req.body.title,
    description: req.body.description,
    startTime: req.body.startTime || new Date(),
    attendees: req.body.attendees || [],
    createdBy: req.body.userId || 1 // Default to admin
  };
  meetings.push(meeting);
  res.status(201).json(meeting);
});

// Get All Meetings
app.get('/api/meetings', (req, res) => {
  res.json(meetings);
});

// Get Single Meeting
app.get('/api/meetings/:id', (req, res) => {
  const meeting = meetings.find(m => m.id == req.params.id);
  res.json(meeting || { error: "Not found" });
});

// Update Meeting
app.put('/api/meetings/:id', (req, res) => {
  const index = meetings.findIndex(m => m.id == req.params.id);
  if (index >= 0) {
    meetings[index] = { ...meetings[index], ...req.body };
    res.json(meetings[index]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// Delete Meeting
app.delete('/api/meetings/:id', (req, res) => {
  meetings = meetings.filter(m => m.id != req.params.id);
  res.json({ success: true });
});
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Test login with:`);
  console.log(`curl -X POST http://localhost:${port}/api/user/login \\
    -H "Content-Type: application/json" \\
    -d '{"username":"admin@gmail.com","password":"admin123"}'`);
});

// Keep process running
setInterval(() => {}, 1000);
