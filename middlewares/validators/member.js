const { check } = require('express-validator');
// const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const path = require('path'); // to detect path of directory
const crypto = require('crypto'); // to encrypt something
const fs = require('fs');
const { promisify } = require('util');
const myValidationResult = require('../../services/myValidationResult');
const { member } = require('../../models');
const { findByEmail, findByUsername, findById } = require('../../services/user-services');
// const config = require('../../config');
// const imageUpload = require('../../tools/awsS3');

// eslint-disable-next-line security/detect-non-literal-fs-filename
const unlinkAsync = promisify(fs.unlink);

const uploadDir = ''; // make images upload to /img/
const storage = multer.diskStorage({
  destination: `./uploads/foto/member`, // make images upload to /public/img/
  filename(req, file, cb) {
    // eslint-disable-next-line security/detect-pseudoRandomBytes
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname)); // encrypt filename and save it into the /public/img/ directory
      });
  },
});

const upload = multer({
  storage,
  dest: uploadDir,
});

module.exports = {
  signup: [
    check('namaLengkap')
      .notEmpty()
      .withMessage('name cant null')
      .matches(/^[a-zA-Z ']{3,200}$/)
      .withMessage('invalid name value'),
    check('alamat')
      .notEmpty()
      .withMessage('alamat cant null')
      .matches(/^[a-zA-Z0-9.,:=/_ ]{3,200}$/)
      .withMessage('invalid value'),
    check('tglLahir')
      .notEmpty()
      .withMessage('Tanggal Lahir cant null')
      .custom((value) => {
        return new Date(value);
      })
      // .isDate()
      .withMessage('invalid input'),
    check('email')
      .notEmpty()
      .withMessage('email cant null')
      .normalizeEmail({
        gmail_remove_dots: false,
      })
      .isEmail()
      .withMessage('email must be email address')
      .custom(async (email) => {
        const count = await member.count({ where: { email } });
        if (count === 1) {
          throw new Error('email already used!');
        } else {
          return true;
        }
      }),
    check('username')
      .notEmpty()
      .withMessage('username cant null')
      .matches(/^[a-zA-Z0-9_]{3,200}$/)
      .withMessage('username must have 3 to 32 characters without any space')
      .custom(async (username) => {
        const count = await member.count({ where: { username } });
        if (count === 1) {
          throw new Error('username already used!');
        } else {
          return true;
        }
      }),
    check('password')
      .notEmpty()
      .withMessage('password cant null')
      .isLength({
        min: 6,
      })
      .withMessage('password min 6 characters'),
    (req, res, next) => {
      const errors = myValidationResult(req);
      if (errors) {
        return res.status(422).json({
          errors: errors.mapped(),
        });
      }
      next();
    },
  ],
  login: [
    check('username').notEmpty().withMessage('username required'),
    check('password').notEmpty().withMessage('password required'),
    (req, res, next) => {
      console.log(res)
      const errors = myValidationResult(req);
      if (!errors.isEmpty()) {
        
        return res.status(422).json({
          errors: errors.mapped({}),
        });
      }
      next();
    },
  ],
  forgotPassword: [
    check('email')
      .notEmpty()
      .withMessage('email cant null')
      .normalizeEmail({
        gmail_remove_dots: false,
      })
      .isEmail()
      .withMessage('email must be email address')
      .custom(async (email) => {
        const userForgot = await findByEmail(email);
        if (!userForgot) {
          throw new Error('User not found');
        }
      }),
    (req, res, next) => {
      const errors = myValidationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped({}),
        });
      }
      next();
    },
  ],
  resetPassword: [
    check('code').notEmpty().withMessage('code cant null'),
    check('new_password')
      .notEmpty()
      .withMessage('password cant null')
      .isLength({
        min: 6,
      })
      .withMessage('password min 6 characters'),
    check('email')
      .notEmpty()
      .withMessage('email cant null')
      .normalizeEmail({
        gmail_remove_dots: false,
      })
      .isEmail()
      .withMessage('email must be email address')
      .custom(async (email) => {
        const userForgot = await findByEmail(email);
        if (!userForgot) {
          throw new Error('User not found');
        }
      }),
    (req, res, next) => {
      const errors = myValidationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped({}),
        });
      }
      next();
    },
  ],
  update: [
    upload.single('profilPic'),
    check('profilPic')
      .custom((value, { req }) => {
        if (req.file === undefined) {
          return true;
        }
        if (req.file.mimetype.startsWith('image')) {
          return true;
        }
        return false;
      })
      .withMessage('file upload must be images file'),
    check('profilPic')
      .custom((value, { req }) => {
        if (req.file === undefined) {
          return true;
        }
        if (req.file.size > 5 * 1024 * 1024) {
          return false;
        }
        return true;
      })
      .withMessage('file size max 5mb'),
    check('namaLengkap')
      .notEmpty()
      .withMessage('name cant null')
      .matches(/^[a-zA-Z ']{3,200}$/)
      .withMessage('invalid name value'),
    check('alamat')
      .notEmpty()
      .withMessage('alamat cant null')
      .matches(/^[a-zA-Z0-9.,:=/_ ]{3,200}$/)
      .withMessage('invalid value'),
    check('tglLahir')
      .notEmpty()
      .withMessage('Tanggal Lahir cant null')
      .custom((value) => {
        return new Date(value);
      })
      .isDate()
      .withMessage('invalid input'),
    check('email')
      .notEmpty()
      .withMessage('email cant null')
      .normalizeEmail({
        gmail_remove_dots: false,
      })
      .isEmail()
      .withMessage('email must be email address')
      .custom(async (email, { req }) => {
        const user = findByEmail(email);
        if (!user.isEmpty() && user.id != req.user.id) {
          throw new Error('email already used!');
        } else {
          return true;
        }
      }),
    check('username')
      .notEmpty()
      .withMessage('username cant null')
      .matches(/^[a-zA-Z0-9_]{3,200}$/)
      .withMessage('username must have 3 to 32 characters without any space')
      .custom(async (username, { req }) => {
        const user = findByUsername(username);
        if (user && user.id !== req.user.id) {
          throw new Error('username already used!');
        } else {
          return true;
        }
      }),
    check('password')
      .notEmpty()
      .withMessage('password cant null')
      .isLength({
        min: 6,
      })
      .withMessage('password min 6 characters'),
    async (req, res, next) => {
      const errors = myValidationResult(req);
      if (!errors.isEmpty()) {
        // try {
        //   const params = {
        //     Bucket: config.aws.bucket,
        //     Key: req.file.filename,
        //   };
        //   await s3.send(new DeleteObjectCommand(params));
        // } catch (error) {
        //   console.log(error);
        // }
        if (req.file) {
          await unlinkAsync(req.file.path);
        }
        return res.status(422).json({
          errors: errors.mapped({}),
        });
      }
      next();
    },
  ],
  updateByAdmin: [
    upload.single('profilPic'),
    check('id_member')
      .notEmpty()
      .withMessage('id member required')
      .custom(async (id) => {
        const exist = await findById(id);
        if (!exist) {
          throw new Error('member doesnt exist');
        }
      }),
    check('profilPic')
      .custom((value, { req }) => {
        if (req.file === undefined) {
          return true;
        }
        if (req.file.mimetype.startsWith('image')) {
          return true;
        }
        return false;
      })
      .withMessage('file upload must be images file'),
    check('profilPic')
      .custom((value, { req }) => {
        if (req.file === undefined) {
          return true;
        }
        if (req.file.size > 5 * 1024 * 1024) {
          return false;
        }
        return true;
      })
      .withMessage('file size max 5mb'),
    check('namaLengkap')
      .notEmpty()
      .withMessage('name cant null')
      .matches(/^[a-zA-Z ']{3,200}$/)
      .withMessage('invalid name value'),
    check('alamat')
      .notEmpty()
      .withMessage('alamat cant null')
      .matches(/^[a-zA-Z0-9.,:=/_ ]{3,200}$/)
      .withMessage('invalid value'),
    check('tglLahir')
      .notEmpty()
      .withMessage('Tanggal Lahir cant null')
      .custom((value) => {
        return new Date(value);
      })
      .isDate()
      .withMessage('invalid input'),
    check('email')
      .notEmpty()
      .withMessage('email cant null')
      .normalizeEmail({
        gmail_remove_dots: false,
      })
      .isEmail()
      .withMessage('email must be email address')
      .custom(async (email, { req }) => {
        const user = findByEmail(email);
        if (user && user.id !== req.user.id) {
          throw new Error('email already used!');
        } else {
          return true;
        }
      }),
    check('username')
      .notEmpty()
      .withMessage('username cant null')
      .matches(/^[a-zA-Z0-9_]{3,200}$/)
      .withMessage('username must have 3 to 32 characters without any space')
      .custom(async (username, { req }) => {
        const user = findByUsername(username);
        if (user && user.id !== req.user.id) {
          throw new Error('username already used!');
        } else {
          return true;
        }
      }),
    check('password')
      .notEmpty()
      .withMessage('password cant null')
      .isLength({
        min: 6,
      })
      .withMessage('password min 6 characters'),
    check('isActive').notEmpty().withMessage('isActive cant null').isBoolean().withMessage('invalid value'),
    check('role')
      .notEmpty()
      .withMessage('role cant null')
      .custom(async (role) => {
        if (role !== 'user' || role !== 'admin') {
          throw new Error('only user or admin');
        }
      }),
    check('saldo').notEmpty().withMessage('saldo cant null').isNumeric().withMessage('invalid value'),
    check('code')
      .notEmpty()
      .withMessage('code cant null')
      .isNumeric()
      .isLength({ min: 6, max: 6 })
      .withMessage('invalid value'),
    async (req, res, next) => {
      const errors = myValidationResult(req);
      if (!errors.isEmpty()) {
        // try {
        //   const params = {
        //     Bucket: config.aws.bucket,
        //     Key: req.file.filename,
        //   };
        //   await s3.send(new DeleteObjectCommand(params));
        // } catch (error) {
        //   console.log(error);
        // }
        if (req.file) {
          await unlinkAsync(req.file.path);
        }
        return res.status(422).json({
          errors: errors.mapped({}),
        });
      }
      next();
    },
  ],
  delete: [
    check('id_member').notEmpty().withMessage('id member cant null').isNumeric().withMessage('invalid value'),
    async (req, res, next) => {
      
      const errors = myValidationResult(req);
      if (!errors.isEmpty()) {
        // try {
        //   const params = {
        //     Bucket: config.aws.bucket,
        //     Key: req.file.filename,
        //   };
        //   await s3.send(new DeleteObjectCommand(params));
        // } catch (error) {
        //   console.log(error);
        // }
        if (req.file) {
          await unlinkAsync(req.file.path);
        }
        return res.status(422).json({
          errors: errors.mapped({}),
        });
      }
      next();
    },
  ], updateimage: [
    upload.single('profilPic'),
    check('profilPic')
      .custom((value, { req }) => {
        if (req.file === undefined) {
          return true;
        }
        if (req.file.mimetype.startsWith('image')) {
          return true;
        }
        return false;
      })
      .withMessage('file upload must be images file'),
    check('profilPic')
      .custom((value, { req }) => {
        if (req.file === undefined) {
          return true;
        }
        if (req.file.size > 5 * 1024 * 1024) {
          return false;
        }
        return true;
      })
      .withMessage('file size max 5mb'),
    async (req, res, next) => {
      const errors = myValidationResult(req);
      if (!errors.isEmpty()) {
       
        // try {
        //   const params = {
        //     Bucket: config.aws.bucket,
        //     Key: req.file.filename,
        //   };
        //   await s3.send(new DeleteObjectCommand(params));
        // } catch (error) {
        //   console.log(error);
        // }
        if (req.file.path) {
          await unlinkAsync(req.file.path);
        }
        return res.status(422).json({
          errors: errors.mapped({}),
        });
      }else{
         console.log(req.file)
         await member.update({profilPic: req.file.filename}, { where: { id: req.body.id } });
      }
      next();
    },
  ],
};
