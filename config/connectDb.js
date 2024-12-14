const mongoose = require('mongoose')
const colors= require('colors')
const connectDb = async function(){
    try {
     await mongoose.connect(process.env.MONGO_URL)
      console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgBlack);
    }
} 

module.exports= connectDb;