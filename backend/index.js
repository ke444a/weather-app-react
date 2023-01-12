const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api', require('./routes'));

app.use(cors());

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));