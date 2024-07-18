//this file will help to form connection between mongoDB database server and nodemon.js server via mongoose

const mongoose = require("mongoose")

// Define the MongoDB connection URl

const mongoURL="mongodb://127.0.0.1:27017/hotel;"

//set up mongoDB connection

mongoose.connect(mongoURL,{
//to avoid warnings
    useNewUrlParser:true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection
const db=mongoose.connection;

//Define event listeners for database connection 

db.on('connected',()=>{
    console.log("connected to MongoDB server")
})
db.on('error',()=>{
    console.log("error in  server")
})
db.on('disconnected',()=>{
    console.log("disconnected with MongoDB server")
})


//Now export the database connection to the server file

module.exports=db;