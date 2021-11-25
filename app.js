const express = require('express');
const cors = require('cors');
const serve   = require('express-static');

const user = require('./routes/user');
const undangan = require('./routes/undangan');
const admin = require('./routes/admin');


const app = express();

app.use("/uploads",serve(__dirname +'/uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/v1', user);
app.use('/v1', undangan);
app.use('/v1', admin)


module.exports = app;
