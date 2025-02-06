const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'idex.html')); 
});

app.get('/apiKey', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
