const express = require('express');
const router = express.Router();
const Person = require("../models/person");

// Post method to enter the person detail
router.post("/", async (req, res) => {
  try {
    const data = req.body; // assuming the req body contains the person data
    console.log(data);

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error saving person: ", error); // Log the actual error
    res.status(500).json({ error: "internal server error" });
  }
});

// GET method to get the person detail
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log("successfully fetched");
    res.status(200).json(data); // this is to show data on postman and browser
  } catch (error) {
    console.error("Error finding person: ", error); // Log the actual error
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType });
      console.log(response);
      res.status(200).json(response); // this is to show data on postman and in browser
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.error("Error finding person: ", error); // Log the actual error
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Update data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Return the updated document
      runValidators: true, // Run mongoose validator
    });
    if (!response) { // If particular object is not present then show error
      return res.status(404).json({ error: "person not found" });
    }

    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error finding person: ", error); // Log the actual error
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id; // Extract the ID from the URL parameter
    const response = await Person.findByIdAndDelete(id); // Find and delete the person by ID

    if (response) {
      res.status(200).json({ message: "Person deleted successfully", data: response });
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    console.error("Error deleting person: ", error); // Log the actual error
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
