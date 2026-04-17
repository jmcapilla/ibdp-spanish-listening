const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware to serve static files
app.use('/audio', express.static(path.join(__dirname, 'audio')));

// Route to serve listening exercises
app.get('/exercises', (req, res) => {
    res.json([
        { id: 1, title: 'Exercise 1', audio: '/audio/exercise1.mp3' },
        { id: 2, title: 'Exercise 2', audio: '/audio/exercise2.mp3' }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});