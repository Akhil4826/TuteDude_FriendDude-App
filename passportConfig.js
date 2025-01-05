require('dotenv').config()
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

// Define a local strategy for passport to use
module.exports = function (passport) {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.SECRET
 
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          // If there is a user with that username:
          // Compare the password the user entered with the password in the database
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err
            if (result === true) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          })

          // return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )

  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        _id: user._id,
        username: user.username,
        password: user.password,
        profilePictureUrl: user.profilePictureUrl,
        role: user.role,
        posts: user.posts,
        friends: user.friends,
        friendRequests: user.friendRequests,
      }
      cb(err, userInformation)
      // cb(err, user)
    })
  })
}
