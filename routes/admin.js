const passport = require('passport');
require('../middlewares/auth');
const router = require('express').Router();
const AdminController = require('../controllers/admin');

// create PenarikanVet
router.post('/Admin/create', AdminController.create);
router.post('/Admin/login', [
  (req, res, next) => {
       passport.authenticate(
            'login',
            {
                 session: false,
            },
            (err, user, info) => {
                 if (err) {
                      return next(err);
                 }
                 if (!user) {
                      res.status(401).json({
                           status: 'Error',
                           message: info.message,
                      });
                      return;
                 }
                 AdminController.login(user, req, res, next);
            }
       )(req, res, next);
  }
]);


// get all Admin
router.get('/Admin/getall', AdminController.getAll);

// get Admin by id pemilik
//router.get('/Admin/getbyidpemilik/:id',AdminController.getById);

// get by id Admin
router.get('/Admin/:id', AdminController.getById);

// update Admin
router.put(
  '/Admin/update/:id',
   AdminController.update
);

// delete Admin
router.delete(
  '/Admin/delete/:id',
    AdminController.delete
);

module.exports = router;
