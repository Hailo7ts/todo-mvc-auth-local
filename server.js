//import express
const express = require('express')
const app = express()
//import mongoose to use mongodb
const mongoose = require('mongoose')
const passport = require('passport') //import for user authentication
//import mongoose to use mongodb
const mongoose = require('mongoose')
const passport = require('passport') //import for user authentication
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const flash = require('express-flash') //validates login/signup format and flashes error for password length..ect
const logger = require('morgan')//logs whats happening
const connectDB = require('./config/database')//db connection
//routing 
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

//import to use .env file
require('dotenv').config({path: './config/.env'})

//Passport config
require('./config/passport')(passport)

//connect to database
connectDB()

//
app.set('view engine', 'ejs')
app.use(express.static('public'))

//get text out of our requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}, you better catch it!`)
})    