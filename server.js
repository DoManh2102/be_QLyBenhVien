const express = require('express');
const path = require("path");
var bodyParser = require('body-parser')
const { sequelize } = require('./src/models');
const rootRouter = require('./src/router/root');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT || 9000;

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// // cài ứng dụng sửu dụnng kiểu json từ db
app.use(express.json());

app.use(rootRouter);

// cài static file
const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Backend listening on http://localhost:${port}`);
})
