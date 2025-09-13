const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Get restaurant information
router.get('/', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne();
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant information not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update restaurant information (Admin only)
router.put('/', async (req, res) => {
  try {
    let restaurant = await Restaurant.findOne();
    
    if (!restaurant) {
      restaurant = new Restaurant(req.body);
    } else {
      Object.assign(restaurant, req.body);
    }
    
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get restaurant hours
router.get('/hours', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne();
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant information not found' });
    }
    res.json(restaurant.hours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get restaurant contact info
router.get('/contact', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne();
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant information not found' });
    }
    res.json(restaurant.contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

