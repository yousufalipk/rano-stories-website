const express = require('express');
const { PORT, FRONTEND_ORIGIN } = require('./Config/env');
const ConnectToDB = require('./Config/db');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');


const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

app.use(
    cors({
        origin: function (FRONTEND_ORIGIN, callback) {
            return callback(null, true);
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

ConnectToDB();

app.get('/', (req, res) => {
    return res.json('Server Running...');
});

app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});