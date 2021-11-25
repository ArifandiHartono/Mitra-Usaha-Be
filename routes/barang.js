const passport = require('passport');
const router = require('express').Router();
const BarangController = require('../controllers/barang');


// create PenarikanVet
router.post('/Barang/create', BarangController.create);

router.delete('/Barang/delete', BarangController.delete);


// get all Barang
router.get('/Barang/getall', BarangController.getAll);

// get Barang by id pemilik
//router.get('/Barang/getbyidpemilik/:id',BarangController.getById);

// get by id Barang
router.get('/Barang/getallstock', BarangController.getAllStock);

router.get('/Barang/:id_kategori', BarangController.getByKategori);

router.get('/Barang/:kode', BarangController.getByKode);

router.get('/Barang/:id', BarangController.update);


// update Barang
router.put(
  '/Barang/update/:id',[passport.authenticate('admin', { session: false })],
   BarangController.update
);

// delete Barang
router.delete(
  '/Barang/delete/:id',[passport.authenticate('admin', { session: false })],
    BarangController.delete
);

module.exports = router;
