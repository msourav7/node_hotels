//Importing necessary packages to the server
const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport =  require("./auth")


const bodyParser = require("body-parser");
app.use(bodyParser.json()); // it will be present or store data in req.body after processing
const PORT=process.env.PORT || 3000;

//Middleware function to get the log detail
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
  next(); ///Move to the next phase
}



app.use(logRequest)    // To show log detail on every endpoint instead of only one route of below eg.
// To show log detail only in one endpoint "/"   app.get("/",logRequest,(req, res) => {   
  
  //Now auth is done and we will go to authentication middleware
  app.use(passport.initialize());
  
  const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get("/",(req, res) => {
  res.send("hello world");
});

//Import router files
const personRoutes= require('./routes/personRoutes')
const menuItems=  require("./routes/menuRoutes")

//Use the Rouiters
app.use("/person",localAuthMiddleware,personRoutes)
app.use("/menu",menuItems)


app.listen(PORT, () => {
  console.log("listening to port 3000");
});



