const express= require('express')
const router=express.Router()
const Menu = require("../models/Menu");


///Post method to add Menu Item
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
  
      // Create a new Menu document using the Mongoose model
      const newMenu = new Menu(data);
  
      // Save the new menu item to the database
      const response = await newMenu.save();
      console.log("Data saved");
      res.status(200).json(response);
    } catch (error) {
      console.error("Error saving menu item: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

    // GET method to get the person detail

router.get('/',async (req,res)=>{
    try{
const data = await Menu.find()
console.log("succesfully fetched"); 
    res.status(200).json(data);    // this is to show data on postman and browser
    }catch(error){
        console.error("Error finding person: ", error); // Log the actual error
        res.status(500).json({ error: "internal server error" });
    }
})


  module.exports=router