const express = require('express');
const cors = require('cors');
const serve   = require('express-static');

const transaksi = require('./routes/transaksi');
const barang = require('./routes/barang');
const admin = require('./routes/admin');


const app = express();

app.use("/uploads",serve(__dirname +'/uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/v1', barang);
app.use('/v1', transaksi);
app.use('/v1', admin)


module.exports = app;
