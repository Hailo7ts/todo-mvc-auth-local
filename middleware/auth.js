module.exports = {
    ensureAuth: function (req, res, next) {
      //if user is logged in proceed
      if (req.isAuthenticated()) {
        return next()
      //if user is not logged in redirect to get logged in
      } else {
        res.redirect('/')
      }
    }
  }
  