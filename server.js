const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const userRoutes = require('./routes/userRoute');
const connectDb = require('./config/connectDB')


//config dot env file

dotenv.config();
connectDb();

//rest object
const app = express();



//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());


//routes
//user Route
app.use('/api/v1/users',userRoutes);

//transection Route
app.use('/api/v1/transections',require('./routes/transectionRoutes'));

//port

const PORT = 8080 || process.env.PORT


//listening
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`);
})