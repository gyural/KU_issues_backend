require('dotenv').config();
const express = require('express');
const { conn } = require('./db');

const app = express();
const port = 3000;

app.use(express.json())
app.use("/api", require("./routers/registerRoute"))

app.get('/', async (req, res) => {
    try {
        const connection = await conn;
        const rows = await connection.query('SHOW TABLES');
        res.send(`Database connection successful: ${rows}`);
    } catch (err) {
        res.status(500).send(`Database connection failed: ${err.message}`);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});