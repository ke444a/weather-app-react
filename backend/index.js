const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'https://weather-application-rltf.onrender.com'],
    methods: ['GET']
}
app.use(cors(corsOptions));

app.use('/api', require('./routes'));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));