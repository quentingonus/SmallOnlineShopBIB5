"use strict";
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: 'TOP_SECRET',
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
//     },
//     async (token:any, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
passport.use(new JWTstrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'nyan'
}, function (jwtPayload, cb) {
    return User.findOne({ id: jwtPayload.id }, function (err, user) {
        if (err) {
            return cb(err, false);
        }
        if (user) {
            return cb(null, user);
        }
        else {
            return cb(null, false);
        }
    });
}));
