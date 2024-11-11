//import mongoose to interact with mongodb
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    //connect to db via DB_STRING
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true, //mongoose will use new MongoDB connection string parser
      useUnifiedTopology: true, //enables unified topology layer for better compatibility
      useFindAndModify: false, //disables deprecated funcion
      useCreateIndex: true //indexes are created
    })

    //display connection
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    //failed to connect
    console.error(err)
    process.exit(1)
  }
}

//return connection function
module.exports = connectDB
