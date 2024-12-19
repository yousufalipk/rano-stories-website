const express = require('express');
const { PORT } = require('./Config/env');
const ConnectToDB = require('./Config/db');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

app.use(cors());

ConnectToDB();

app.get('/', (req, res) => {
    return res.json('Server Running...');
});

app.use('/', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message,
        stack: error.stack,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
