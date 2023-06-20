// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get("/",async(req, res)=>{
  res.send('the employee database api');
});

// Retrieve all employees with pagination
router.get('/employees', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page
  const limit = parseInt(req.query.limit) || 5; // Number of employees per page

  try {
    const totalEmployees = await User.countDocuments();
    const totalPages = Math.ceil(totalEmployees / limit);

    const skip = (page - 1) * limit;

    const employees = await User.find()
      .skip(skip)
      .limit(limit);

    res.json({
      employees,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving employees' });
  }
});


// Retrieve all Users
router.get('/all-emp-data', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

// Retrieve a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
});

// Create a new user
router.post('/newEmp', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Update an existing user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error updating user' });
  }
});

// Delete an user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
