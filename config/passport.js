const LocalStrategy = require('passport-local').Strategy //imports Strategy obj for authenticating users
const mongoose = require('mongoose') //import mongoose to interact with mongodb
const User = require('../models/User') //imports User model to use with user data stored in db

module.exports = function (passport) {
  /**
   * defines LocalStrategy obj where eusernameField is set to email and the email takes a 
   * callback function with params of email, password, and done to handle authentication
   **/
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    //look for user in db based on lowercase email
    User.findOne({ email: email.toLowerCase() }, (err, user) => {      
      if (err) { return done(err) }//if error return done with error
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }//if user is not found call done with false to indicate email not found to user
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }//if user exists but doesnt have password due to OAuth return failure message to set up password
      
      //verify password with stored hash
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) } //if error return done with error
        if (isMatch) {
          return done(null, user)
        }//if password matches return done with null and user
        return done(null, false, { msg: 'Invalid email or password.' })//if passwords dont match return done with null false and failure message
      })
    })
  }))
  

  //specifies how user info is stored in a session by saving user.id
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  //uses user id to fetch full user obj from db
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
