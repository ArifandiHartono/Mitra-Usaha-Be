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

router.get('/Kategori/getall', BarangController.getAllKategori);


router.post('/Barang', BarangController.getByKategori);

router.get('/Barangbysinglecategory/:id_kategori', BarangController.getByKategoriSingle);


router.get('/Barangsearch/:id', BarangController.search);


router.get('/Barangkode/:kode', BarangController.getByKode);

router.put('/Barang/stockupdate/:id', BarangController.updateStock);


// update Barang
router.put(
  '/Barang/update/:id',
   BarangController.update
);

// delete Barang
router.delete(
  '/Barang/delete/:id',
    BarangController.delete
);

module.exports = router;
