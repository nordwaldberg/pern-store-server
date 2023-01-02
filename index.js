const path = require('path');

const express = require('express');
const uploadFiles = require('express-fileupload');
const env = require('dotenv').config();
const cors = require('cors');

const database = require('./database');
const models = require('./models/models');
const router = require('./routes/index');
const errorsHandler = require('./middlewares/handlingErrorsMiddleware');

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static(path.resolve(__dirname, 'static/products')));
server.use(uploadFiles({}));
server.use('/api', router);

server.use(errorsHandler);

async function startServer() {
    try {
        await database.authenticate();
        await database.sync();

        server.listen(PORT, () => console.log(`Server successfully started on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

startServer();
