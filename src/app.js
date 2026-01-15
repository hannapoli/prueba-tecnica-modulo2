const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', require ('./auth.routes'));

app.listen(port, () => console.log(`Server listening on ${port}`));