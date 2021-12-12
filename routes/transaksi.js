const passport = require('passport');
const router = require('express').Router();
const transaksiController = require('../controllers/transaksi');


// create PenarikanVet
router.post('/transaksi/create', transaksiController.create);

// get all transaksi
router.get('/transaksi/getall/:tanggal', transaksiController.getAll);

router.get('/transaksi/getall/:tanggal/:search', transaksiController.getAllSearch);


// get transaksi by id pemilik
//router.get('/transaksi/getbyidpemilik/:id',transaksiController.getById);

// get by id transaksi
router.get('/transaksi/getallstock/:tanggal', transaksiController.getAllHistoristock);

router.get('/transaksi/getallstock/:tanggal/:search', transaksiController.getAllHistoristockSearch);


router.get('/transaksi/getpendapatan/:tanggal', transaksiController.getPendapatan);

router.get('/transaksi/getbyid/:id', transaksiController.getById);


module.exports = router;
