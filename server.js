const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // it will be present or store data in req.body after processing


app.get("/", (req, res) => {
  res.send("hello world");
});

//Import router files
const personRoutes= require('./routes/personRoutes')
const menuItems=  require("./routes/menuRoutes")

//Use the Rouiters
app.use("/person",personRoutes)
app.use("/menu",menuItems)

app.listen(3000, () => {
  console.log("listening to port 3000");
});



