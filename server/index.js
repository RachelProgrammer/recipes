const express = require('express');
const cors = require('cors');
const routes = require('./routes/api');
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());

const port = 8080;

app.use(cors())

app.use("/api", authMiddleware)
app.use('/api',routes)
connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})