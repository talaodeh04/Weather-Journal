const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'idex.html')); 
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
