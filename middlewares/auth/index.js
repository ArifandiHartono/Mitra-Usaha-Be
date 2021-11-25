const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const randomize = require('randomatic');
const { Admin } = require('../../models');
const config = require('../../config');
const { findById } = require('../../services/user-services');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const hashedPassword = await bcrypt.hash(password, config.app.password_salt);
        req.body.password = hashedPassword;
        const createdUser = await Admin.create(req.body, {
          tglDaftar: new Date(),
          isActive: 0,
          role: 'user',
          code: randomize('0', 6),
          saldo: 0,
        });
        const newUser = await findById(createdUser.id);
        return done(null, newUser, {
          message: 'Registration Success!',
        });
      } catch (err) {
        if (err) {
          return done(null, false, {
            message: 'User failed to create!',
          });
        }
      }
    }
  )
);

passport.use(
  'admin',
  new JWTstrategy(
    {
      secretOrKey: config.jwt.secretKey, // It must be same with secret key when created token
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // It will extract token from req.header('Authorization')
      passReqToCallback: true, // Enable req for next step function
    },
    async (req, token, done) => {
      try {
        const userLogin = await Admin.findOne({where : {id : token.user.id }});
        if (!userLogin) {
          return done(null, false, {
            message: 'User not found!',
          });
        }
        
        return done(null, token.user);
      } catch (e) {
        // If error, it will create this message
        return done(null, false, {
          message: 'tidak ter verif!',
        });
      }
    }
  )
);



passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const userLogin = await Admin.findOne({ where: { username } });
        if (!userLogin) {
          return done(null, false, {
            message: 'These credentials do not match our records.',
          });
        }
        const validate = await bcrypt.compare(password, userLogin.password);
        if (!validate) {
          return done(null, false, {
            message: 'These credentials do not match our records.',
          });
        }
        console.log(validate)
        return done(null, userLogin);
      } catch (err) {
        if (err) {
          return done(null, false, {
            message: 'Login failed',
          });
        }
      }
    }
  )
);
