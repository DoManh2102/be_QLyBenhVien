const express = require('express');
const path = require("path");
var bodyParser = require('body-parser')
const { sequelize } = require('./src/models');
const rootRouter = require('./src/router/root');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 6060;

// // cho phép gọi api trên cùng laptop
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// // cài ứng dụng sửu dụnng kiểu json từ db
app.use(bodyParser.json());
// app.use(express.json());

app.use(rootRouter)

// cài static file
const publicPathDirectory = path.join(__dirname, './public');
app.use("/public", express.static(publicPathDirectory));

// lắng nghe sự kiện kết nối
app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Backen listening on http://localhost:${port}`);
})
